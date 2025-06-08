import {Component, Input} from "@angular/core";
import {StockHolderPageViewDto} from "../../models/stock-holder/stock-holder-page-view.model";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'stock-holder-card',
    templateUrl: 'stock-holder-card.component.html',
    styleUrl: 'stock-holder-card.component.scss',
    imports: [
        CurrencyPipe,
        RouterLink,
        NgOptimizedImage,
        NgIf
    ],
    standalone: true
})
export class StockHolderCardComponent {
    @Input() stockHolder: StockHolderPageViewDto | null = null;
}