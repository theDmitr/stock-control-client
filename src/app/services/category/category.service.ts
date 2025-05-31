import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../models/category/category";

@Injectable()
export class CategoryService {
    private readonly categoriesUrl: string = 'http://localhost:8080/api/v1/categories';

    constructor(private httpClient: HttpClient) {}

    public getAll(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(
            this.categoriesUrl + '/list/page-view'
        );
    }
}