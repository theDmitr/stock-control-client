import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {CategoryService} from "./services/category/category.service";
import {Category} from "./models/category/category";
import {AuthService} from "./services/auth/auth.service";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {ProductService} from "./services/product/product.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        CategoryService, AuthService, ProductService,
        Category,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
    ]
};
