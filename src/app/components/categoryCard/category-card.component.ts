import {Component, Input} from '@angular/core';
import {CategoryPageView} from "../../models/category/category";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'category-card',
    templateUrl: 'category-card.component.html',
    styleUrl: 'category-card.component.scss',
    imports: [
        CurrencyPipe,
        RouterLink,
        NgOptimizedImage,
        NgIf
    ],
    standalone: true
})
export class CategoryCardComponent {
    @Input() category: CategoryPageView | null = null;

    productsCountText(count: number): string {
        const cases = ["товар", "товара", "товаров"];
        let n = Math.abs(count % 100);
        let n1 = n % 10;
        if (n > 10 && n < 20) return cases[2];
        if (n1 > 1 && n1 < 5) return cases[1];
        if (n1 === 1) return cases[0];
        return cases[2];
    }
}