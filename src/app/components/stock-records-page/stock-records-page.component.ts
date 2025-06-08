import {Component, OnInit} from "@angular/core";
import {ProductStockRecordResponseDto} from "../../models/stock-holder/stock-holder-info.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StockRecordPageViewDto} from "../../models/stock-record/stock-record-page-view.model";
import {StockRecordService} from "../../services/stock-record/stock-record.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'stock-records-page-component',
    templateUrl: 'stock-records-page.component.html',
    styleUrl: 'stock-records-page.component.scss',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        NgForOf
    ]
})
export class StockRecordsPageComponent implements OnInit {
    stockRecords: StockRecordPageViewDto[] | null = null;
    isLoading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stockRecordService: StockRecordService
    ) {}

    ngOnInit() {
        this.stockRecordService.getStockRecordsToPageView()
            .subscribe({
                next: response => {
                    this.stockRecords = response;
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                }
            });
    }

    protected handleStockRecordClick(stockRecord: ProductStockRecordResponseDto) {
        this.router.navigate(['/products', stockRecord.productId]);
    }
}