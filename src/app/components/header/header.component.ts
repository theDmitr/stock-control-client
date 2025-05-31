import {Component} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: "header-component",
    templateUrl: "header.component.html",
    styleUrl: "header.component.scss",
    imports: [
        RouterLink
    ],
    standalone: true
})
export class HeaderComponent {

    constructor(protected authService: AuthService) {}


}