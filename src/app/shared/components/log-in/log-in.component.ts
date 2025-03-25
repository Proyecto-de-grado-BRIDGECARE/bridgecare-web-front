import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/account-services/user.service';
import { CommonModule } from '@angular/common';
import swal from "sweetalert";
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-log-in',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css'
})
export class LogInComponent {
  private _router = inject(Router);

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      swal(
        'Error',
        'Por favor ingresa un correo y contraseña válidos',
        'error'
      )
      return;
    }

    const { correo, contrasenia } = this.loginForm.value;

    try {
      const userData = await this.authService.loginWithEmailAndPassword(correo, contrasenia);
      if (userData && userData.token) {
        localStorage.setItem('userToken', userData.token);
        await this.authService.getUserFromToken(userData.token);
        this._router.navigate(['/home']);
      } else {
        swal(
          'Error',
          'Usuario o contraseña incorrectos',
          'error'
        )
      }
    } catch (error) {
      console.error('Login error:', error);
      swal(
        'Error',
        'Ocurrió un error al iniciar sesión. Intenta nuevamente.',
        'error'
      )
    }
  }
}
