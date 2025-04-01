import { Component, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { UsersService } from '../../../services/account-services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../models/account/user';
import { AuthService } from '../../../services/auth/auth.service';
import { IconDelete } from '../../../../../assets/icons/delete';
import { IconEdit } from '../../../../../assets/icons/edit';
import { IconSettings } from '../../../../../assets/icons/settings';
import { IconView } from '../../../../../assets/icons/view';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';
import { SearchBarComponent  } from '../../forms/account-form/search-bar/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf, CommonModule } from '@angular/common';
import swal from "sweetalert";

declare var bootstrap: any;

@Component({
  animations: [
    trigger('openClose', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0 })),
      transition('open <=> closed', [animate('0.3s')]),
    ]),
  ],
  imports:[
    IconDelete,
    IconEdit, 
    IconSettings, 
    IconView, 
    AsyncPipe,
    AccountFormComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    NgForOf,
    CommonModule
  ],
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css',
})
export class TableUsersComponent {
  private toast: any;
  editUserForm: FormGroup;
  isOpen = false;
  isMenuOpen = false;
  currentUser: User | null = null;

  private _usersService = inject(UsersService);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  users$ = new BehaviorSubject<User[]>([]);

  constructor(private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      new_identification: [''],
      new_email: [''],
      new_name: [''],
      new_surname: [''],
      new_municipality: [''],
      new_password: [''],
    });

    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      this.toast = new bootstrap.Toast(toastElement);
    }
  }

  showToast(): void {
    if (this.toast) this.toast.show();
  }

  fetchUsers(): void {
    this._usersService.getUsers().subscribe({
      next: (usuarios: any[]) => {
        console.log('🤖 usuarios obtenidos', usuarios);
        const mapped: User[] = usuarios.map(u => ({
          id: u.identificacion,
          name: u.nombres,
          surname: u.apellidos,
          email: u.correo,
          identification: u.identificacion,
          municipality: u.municipio,
          password: '', // No es necesario mostrarlo
          type: u.tipoUsuario
        }));
        this.users$.next(mapped);
      },
      error: () => swal('Error', 'No se pudieron cargar los usuarios', 'error')
    });
  }
  
  
  

  trackById(index: number, user: User) {
    return user.id;
  }
  
  async changeQuery(query: string) {
    if (!query) return this.fetchUsers();

    this._usersService.searchUserByQuery(query).subscribe({
      next: (users) => this.users$.next(users),
      error: () => swal('Error', 'No se pudo realizar la búsqueda', 'error')
    });
  }

  handleUserRegistered(): void {
    this.isOpen = false;
    this.showToast();
    this.fetchUsers();
  }

  editModal(user: User): void {
    this.currentUser = { ...user };
    this.editUserForm.reset();
    const myModal = new bootstrap.Modal(document.getElementById('editModal'));
    myModal.show();
  }

  deleteModal(user: User): void {
    this.currentUser = user;
    const myModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    myModal.show();
  }

  async updateCurrentUser() {
    if (!this.currentUser) return;

    const ni = this.editUserForm.get('new_identification')?.value;
    const ne = this.editUserForm.get('new_email')?.value;
    const nn = this.editUserForm.get('new_name')?.value;
    const ns = this.editUserForm.get('new_surname')?.value;
    const nm = this.editUserForm.get('new_municipality')?.value;
    const np = this.editUserForm.get('new_password')?.value;

    if (ni) this.currentUser.identification = ni;
    if (ne) this.currentUser.email = ne;
    if (nn) this.currentUser.name = nn;
    if (ns) this.currentUser.surname = ns;
    if (nm) this.currentUser.municipality = nm;
    if (np) {
      const hashed = await this._authService.hashPassword(np);
      this.currentUser.password = hashed;
    }
  }

  async onSubmitEdit() {
    await this.updateCurrentUser();
    if (this.currentUser) {
      this._usersService.updateUser(+this.currentUser.id, this.currentUser).subscribe({
        next: () => {
          swal('Éxito', 'Usuario actualizado correctamente', 'success').then(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            modal?.hide();
            this.fetchUsers();
          });
        },
        error: () => swal('Error', 'Error al actualizar el usuario', 'error')
      });
    }
  }

  async onSubmitDelete() {
    if (!this.currentUser) return;

    this._usersService.deleteUser(+this.currentUser.id).subscribe({
      next: () => {
        swal('Éxito', 'Usuario eliminado correctamente', 'success');
        this.fetchUsers();
      },
      error: () => swal('Error', 'Error al eliminar el usuario', 'error')
    });
  }
}
