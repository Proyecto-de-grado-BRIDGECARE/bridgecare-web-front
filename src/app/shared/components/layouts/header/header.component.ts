import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.loadUserRole();
  }

  isAdmin$ = this.authService.isAdmin$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
