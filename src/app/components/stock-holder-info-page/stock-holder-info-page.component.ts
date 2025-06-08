import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductStockRecordResponseDto, StockHolderInfoDto} from "../../models/stock-holder/stock-holder-info.model";
import {StockHolderService} from "../../services/stock-holder/stock-holder.service";
import {Component, OnInit} from "@angular/core";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: "stock-holder-info-page-component",
    templateUrl: "stock-holder-info-page.component.html",
    styleUrl: "stock-holder-info-page.component.scss",
    imports: [
        CurrencyPipe,
        NgForOf,
        NgIf,
        RouterLink
    ],
    standalone: true
})
export class StockHolderInfoPageComponent implements OnInit {
    stockHolder?: StockHolderInfoDto;
    isLoading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stockHolderService: StockHolderService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const stockHolderId: string = params["stockHolderId"];

            this.stockHolderService.getStockHolderInfoById(stockHolderId).subscribe({
                next: (response) => {
                    this.stockHolder = response;
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                }
            });
        });
    }

    protected handleStockRecordClick(stockRecord: ProductStockRecordResponseDto) {
        this.router.navigate(['/products', stockRecord.productId]);
    }
}