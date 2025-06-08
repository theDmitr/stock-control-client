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
    loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const productId: string = params["productId"];

            this.productService.getProductInfoById(productId).subscribe({
                next: (response) => {
                    this.product = response;
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                }
            });

            if (this.product) {
                this.selectedImage = this.product.images[0];
            }
        });
    }

    selectImage(img: string) {
        this.selectedImage = img;
    }
}