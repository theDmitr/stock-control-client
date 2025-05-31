import {Component} from "@angular/core";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../models/category/category";
import {CategoryCardComponent} from "../categoryCard/category-card.component";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
    selector: "categories",
    templateUrl: "categories.component.html",
    styleUrl: "categories.component.scss",
    imports: [
        CategoryCardComponent,
        FormsModule,
        NgForOf,
        ProductCardComponent
    ],
    standalone: true
})
export class CategoriesComponent {
    private categoryService: CategoryService;
    protected categories: Category[] | undefined;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
        this.categoryService.getAll().subscribe(data => this.categories = data);
    }
}