import {Component} from "@angular/core";
import {CategoryCardComponent} from "../categoryCard/category-card.component";
import {CategoriesComponent} from "../categories/categories.component";
import {ProductsPageComponent} from "../products/products-page.component";

@Component({
    selector: "main-component",
    templateUrl: "main.component.html",
    styleUrl: "main.component.scss",
    imports: [
        CategoryCardComponent,
        CategoriesComponent,
        ProductsPageComponent
    ],
    standalone: true
})
export class MainComponent {
}