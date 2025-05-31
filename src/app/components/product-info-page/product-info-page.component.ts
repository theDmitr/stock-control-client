import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ProductInfo} from "../../models/product/product-info";

@Component({
    selector: "product-info-page-component",
    templateUrl: "product-info-page.component.html",
    styleUrl: "product-info-page.component.scss",
    imports: [
        CurrencyPipe,
        NgForOf,
        NgIf,
        RouterLink
    ],
    standalone: true
})
export class ProductInfoPageComponent implements OnInit {

    product?: ProductInfo;
    selectedImage?: string;
    quantity: number = 1;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const productId: string = params["productId"];

            this.productService.getProductInfoById(productId).subscribe(
                response => this.product = response
            );

            if (this.product) {
                this.selectedImage = this.product.images[0];
                //this.relatedProducts = this.productService.getRelatedProducts(id);
            }
        });
    }

    selectImage(img: string) {
        this.selectedImage = img;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}