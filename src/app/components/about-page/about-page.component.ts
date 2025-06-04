import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";
import {RouterLink} from "@angular/router";

@Component({
    selector: "about-page-component",
    templateUrl: "about-page.component.html",
    styleUrl: "about-page.component.scss",
    imports: [
        FormsModule,
        NgForOf,
        ProductCardComponent,
        RouterLink
    ],
    standalone: true
})
export class AboutPageComponent {

}