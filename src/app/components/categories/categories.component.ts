import {Component, OnInit} from "@angular/core";
import {CategoryService} from "../../services/category/category.service";
import {CategoryPageView} from "../../models/category/category";
import {CategoryCardComponent} from "../categoryCard/category-card.component";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";
import {ActivatedRoute, Params, Router} from "@angular/router";

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
export class CategoriesComponent implements OnInit {

    protected categories: CategoryPageView[] | null = null;
    parentCategoryFilter: string = '';

    loading: boolean = true;
    error: string | null = null;

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.parentCategoryFilter = params['parentCategoryId'] || '';
                this.loadCategories();
            });
    }

    loadCategories(): void {
        this.loading = true;
        this.error = null;
        this.categories = null;

        this.categoryService.getCategoriesToPageView(this.parentCategoryFilter)
            .subscribe({
                next: (response) => {
                    this.categories = response;
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Failed to load products', err);
                    this.error = 'Failed to load products. Please try again later.';
                    this.loading = false;
                }
            });
    }

    handleCategoryClick(category: any) {
        if (category.hasChild) {
            const queryParams: Params = {};
            queryParams['parentCategoryId'] = category.id;

            this.router.navigate([], {
                relativeTo: this.route,
                queryParams,
                queryParamsHandling: 'merge'
            });
        } else {
            const queryParams: Params = {};
            queryParams['category'] = category.id;

            this.router.navigate(['/products'], {
                relativeTo: this.route,
                queryParams,
                queryParamsHandling: 'merge'
            });
        }
    }
}