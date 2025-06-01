// header.component.ts
import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class HeaderComponent {
    constructor(protected authService: AuthService) {}
}