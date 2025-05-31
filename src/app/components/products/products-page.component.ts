import {Component, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ProductCardComponent} from "../product-card/product-card.component";
import {NgForOf} from "@angular/common";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product/product";
import {ProductPageView} from "../../models/product/product-page-view";

@Component({
    selector: 'products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss'],
    imports: [
        FormsModule,
        ProductCardComponent,
        NgForOf
    ],
    standalone: true
})
export class ProductsPageComponent implements OnInit {

    protected products: ProductPageView[] | null = null;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getProductsToPageView().subscribe(
            response => this.products = response
        );
    }
}