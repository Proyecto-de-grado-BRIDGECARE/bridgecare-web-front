import { Component, OnInit, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserForm } from '../../../../models/account/user';
import { UsersService } from '../../../services/account-services/user.service';
import { AuthService } from '../../../services/auth/auth.service';

export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
    selector: 'app-account-form',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './account-form.component.html',
    styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  submitting = false;
  @Output() userRegistered = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.accountForm = this.fb.group({
      type: ['']
    });
  }

  private _usersService = inject(UsersService);
  private _userId = '';

  get userId(): string {
    return this._userId;
  }

  @Input() set userId(value: string) {
    this._userId = value;
    this.setFormValues(this._userId);
  }

  private initializeForm(): void {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      identification: [null, [Validators.required, this.numberValidator]],
      email: ['', [Validators.required, Validators.email]],
      type: [0, [Validators.required, this.numberValidator]],
      municipality: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  numberValidator(control: FormControl<any>): ValidationErrors | null {
    if (isNaN(control.value) || control.value === null || !isFinite(control.value)) {
      return {
        invalidNumber: true
      };
    }
    return null;
  }

  async createUser() {
    if (this.accountForm.invalid || this.submitting) return;
  
    this.submitting = true;
  
    try {
      const formValues = this.accountForm.value;
  
      // 🔁 Adaptar campos al formato que espera el backend
      const userToSend = {
        nombres: formValues.name,
        apellidos: formValues.surname,
        identificacion: formValues.identification,
        correo: formValues.email,
        tipoUsuario: formValues.type,
        municipio: formValues.municipality,
        contrasenia: await this.authService.hashPassword(formValues.password)
      };
  
      console.log("📤 Enviando usuario:", userToSend);
  
      // Crear usuario
      if (!this.userId) {
        this._usersService.createUser(userToSend).subscribe({
          next: res => {
            console.log("✅ Usuario creado con éxito:", res);
            swal("Usuario creado", "Se ha registrado correctamente", "success");
            this.userRegistered.emit();
            this.accountForm.reset();
          },
          error: err => {
            console.error("❌ Error al registrar usuario:", err);
            swal("Error", "No se pudo registrar el usuario", "error");
          }
        });
      } else {
        //editar
        this._usersService.updateUser(+this.userId, userToSend).subscribe({
          next: () => {
            swal("Actualizado", "Usuario actualizado correctamente", "success");
            this.userRegistered.emit();
          },
          error: () => {
            swal("Error", "No se pudo actualizar el usuario", "error");
          }
        });
      }
  
    } catch (error) {
      console.error('❌ Error creando usuario:', error);
      swal("Error", "Hubo un problema inesperado", "error");
    } finally {
      this.submitting = false;
    }
  }
  
  

  async setFormValues(id: string) {
    try {
      this._usersService.getUser(+id).subscribe({
        next: (user) => {
          if (!user) return;
          this.accountForm.setValue({
            name: user.name,
            surname: user.surname,
            identification: user.identification,
            email: user.email,
            type: user.type,
            municipality: user.municipality,
            password: user.password
          });
        },
        error: (error) => {
          console.error('Error al cargar usuario:', error);
        }
      });
      
    } catch (error) {}
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      type: [''],
      municipality: [{value: '', disabled: false}]
    });

    this.initializeForm();
    this.watchTypeChanges();
  }

  watchTypeChanges(): void {
    this.accountForm.get('type')!.valueChanges.subscribe(value => {
      if (value === '2') {
        this.accountForm.get('municipality')!.enable();
      } else {
        this.accountForm.get('municipality')!.disable();
      }
    });
  }
  
  onSubmit() {
    this.redirect();
  }

  redirect() {
    //this.router.navigate(['/inicio']);
  }

  onRegister() {
  }
}
