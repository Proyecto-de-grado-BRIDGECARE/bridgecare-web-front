import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/layouts/header/header.component";
import { HomePageComponent } from "../../../shared/components/homepage/homepage.component";

@Component({
    selector: 'app-home',
    imports: [
        HeaderComponent,
        HomePageComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
