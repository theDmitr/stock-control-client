import {Component} from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MainComponent} from "./components/main/main.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {
}