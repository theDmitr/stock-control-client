import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, CategoryPageView} from "../../models/category/category";
import {environment} from "../../environments/environment";

@Injectable()
export class CategoryService {
    private readonly SERVICE_URL = environment.ITEM_URL + '/categories';

    constructor(private httpClient: HttpClient) {}

    public getAll(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(
            `${this.SERVICE_URL}`
        );
    }

    public getCategoriesToPageView(parentCategoryId: string = ''): Observable<CategoryPageView[]> {
        let params = new HttpParams();

        if (parentCategoryId) params = params.set('parentCategoryId', parentCategoryId);

        return this.httpClient.get<CategoryPageView[]>(
            `${this.SERVICE_URL}/list/page-view`,
            { params }
        );
    }
}