import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../../models/product/product";
import {ProductInfo} from "../../models/product/product-info";
import {ProductPageView} from "../../models/product/product-page-view";

@Injectable()
export class ProductService {
    private readonly SERVICE_URL = environment.ITEM_URL + '/products';

    constructor(private httpClient: HttpClient) {}

    public getAll(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.SERVICE_URL);
    }

    public getById(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.SERVICE_URL}/${id}`);
    }

    public getProductsToPageView(): Observable<ProductPageView[]> {
        return this.httpClient.get<ProductPageView[]>(
            this.SERVICE_URL + '/list/page-view'
        );
    }

    public getProductInfoById(id: string): Observable<ProductInfo> {
        return this.httpClient.get<ProductInfo>(
            `${this.SERVICE_URL}/${id}/info`
        );
    }
}