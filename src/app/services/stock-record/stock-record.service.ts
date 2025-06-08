import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockRecordPageViewDto} from "../../models/stock-record/stock-record-page-view.model";

@Injectable()
export class StockRecordService {
    private readonly SERVICE_URL = environment.STOCK_URL + '/stock-records';

    constructor(private httpClient: HttpClient) {}

    public getStockRecordsToPageView(): Observable<StockRecordPageViewDto[]> {
        return this.httpClient.get<StockRecordPageViewDto[]>(this.SERVICE_URL + '/list/page-view');
    }
}