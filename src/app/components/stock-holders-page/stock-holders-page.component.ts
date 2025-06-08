import {Component, OnInit} from "@angular/core";
import {StockHolderService} from "../../services/stock-holder/stock-holder.service";
import {CategoryCardComponent} from "../categoryCard/category-card.component";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {StockHolderPageViewDto} from "../../models/stock-holder/stock-holder-page-view.model";
import {StockHolderCardComponent} from "../stock-holder-card/stock-holder-card.component";

@Component({
    selector: 'stock-holders-page',
    templateUrl: 'stock-holders-page.component.html',
    styleUrls: ['stock-holders-page.component.scss'],
    imports: [
        CategoryCardComponent,
        NgForOf,
        StockHolderCardComponent
    ],
    standalone: true
})
export class StockHoldersPageComponent implements OnInit {
    protected stockHolders: StockHolderPageViewDto[] | null = null;

    constructor(private stockHolderService: StockHolderService,
                private router: Router) {}

    ngOnInit(): void {
        this.stockHolderService.getStockHoldersToPageView()
            .subscribe(d => this.stockHolders = d);
    }

    protected handleStockHolderClick(stockHolder: StockHolderPageViewDto) {
        this.router.navigate(['/stock-holders', stockHolder.stockHolderId]);
    }
}