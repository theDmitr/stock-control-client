import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
    selector: "about-page-component",
    templateUrl: "about-page.component.html",
    styleUrl: "about-page.component.scss",
    imports: [
        FormsModule,
        NgForOf,
        ProductCardComponent
    ],
    standalone: true
})
export class AboutPageComponent {

}