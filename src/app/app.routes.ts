import {Routes} from '@angular/router';
import {ProductsPageComponent} from "./components/products/products-page.component";
import {AboutPageComponent} from "./components/about-page/about-page.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductInfoPageComponent} from "./components/product-info-page/product-info-page.component";

export const routes: Routes = [
    { path: 'products', component: ProductsPageComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'product/:productId', component: ProductInfoPageComponent },
];
