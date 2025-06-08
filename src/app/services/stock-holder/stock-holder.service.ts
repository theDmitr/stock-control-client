import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockHolderPageViewDto} from "../../models/stock-holder/stock-holder-page-view.model";
import {StockHolderInfoDto} from "../../models/stock-holder/stock-holder-info.model";

@Injectable()
export class StockHolderService {
    private readonly SERVICE_URL = environment.STOCK_URL + '/stock-holders';

    constructor(private httpClient: HttpClient) {}

    public getStockHoldersToPageView(): Observable<StockHolderPageViewDto[]> {
        return this.httpClient.get<StockHolderPageViewDto[]>(this.SERVICE_URL + '/list/page-view');
    }

    public getStockHolderInfoById(id: string): Observable<StockHolderInfoDto> {
        return this.httpClient.get<StockHolderInfoDto>(
            `${this.SERVICE_URL}/${id}/info`
        );
    }
}