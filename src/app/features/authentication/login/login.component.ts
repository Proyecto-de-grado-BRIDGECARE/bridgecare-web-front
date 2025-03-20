import { Component } from '@angular/core';
import {LogInComponent} from "../../../shared/components/log-in/log-in.component";

@Component({
    selector: 'app-login',
    imports: [
        LogInComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

}
