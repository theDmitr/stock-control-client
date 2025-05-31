import {Component, Input} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    imports: [
        CurrencyPipe,
        RouterLink
    ],
    standalone: true
})
export class ProductCardComponent {
    @Input() product: any;
}