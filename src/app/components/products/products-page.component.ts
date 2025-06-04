// products-page.component.ts
import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../services/product/product.service";
import {ProductPageView} from "../../models/product/product-page-view";
import {FormsModule} from "@angular/forms";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CommonModule, NgForOf} from "@angular/common";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category/category';

@Component({
    selector: 'products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss'],
    imports: [
        FormsModule,
        ProductCardComponent,
        NgForOf,
        CommonModule
    ],
    standalone: true
})
export class ProductsPageComponent implements OnInit {

    products: ProductPageView[] | null = null;
    searchTerm: string = '';
    categoryFilter: string = '';
    isFilterCollapsed: boolean = false;
    categories: Category[] = [];
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.loadCategories();

        this.route.queryParams
            .subscribe(params => {
                this.searchTerm = params['search'] || '';
                this.categoryFilter = params['category'] || '';
                this.loadProducts();
            });
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: () => {
                this.error = 'Ошибка загрузки категорий';
            }
        });
    }

    loadProducts(): void {
        this.loading = true;
        this.error = null;
        this.products = null;

        this.productService.getFilteredProducts(this.searchTerm, this.categoryFilter)
            .subscribe({
                next: (response) => {
                    this.products = response;
                    this.loading = false;
                },
                error: () => {
                    this.error = 'Ошибка загрузки карточек товаров';
                    this.loading = false;
                }
            });
    }

    applyFilters(): void {
        const queryParams: Params = {};
        queryParams['search'] = this.searchTerm;
        queryParams['category'] = this.categoryFilter;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge'
        });

        this.loadProducts();
    }

    resetFilters(): void {
        this.searchTerm = '';
        this.categoryFilter = '';
        this.applyFilters();
    }

    toggleFilterPanel(): void {
        this.isFilterCollapsed = !this.isFilterCollapsed;
    }
}