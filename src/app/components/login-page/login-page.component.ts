import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoginRequest} from "../../models/auth/login-request.model";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.scss'],
    imports: [FormsModule, NgIf],
    standalone: true
})
export class LoginComponent {
    protected loginRequest: LoginRequest = {} as LoginRequest;
    protected isError: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onLogin() {
        this.isError = false;

        this.authService.login(this.loginRequest)
            .subscribe({
                next: () => this.router.navigate(['/']),
                error: () => {
                    this.isError = true;
                }
            });
    }
}