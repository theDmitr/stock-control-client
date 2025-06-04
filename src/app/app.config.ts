import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {CategoryService} from "./services/category/category.service";
import {Category} from "./models/category/category";
import {AuthService} from "./services/auth/auth.service";
import {ProductService} from "./services/product/product.service";
import {StorageService} from "./services/storage/storage.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {UnauthorizedInterceptor} from "./interceptors/unauthorized.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        CategoryService, AuthService, ProductService, StorageService,
        Category,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    ]
};
