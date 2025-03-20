import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
    selector: 'app-error',
    imports: [
        RouterLink
    ],
    templateUrl: './error.component.html',
    styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  buttonRoute!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setButtonRoute();
  }

  private setButtonRoute() {
    const user = sessionStorage.getItem('user');
    this.buttonRoute = user ? '/' : '/login';
  }
}
