import {Routes} from '@angular/router';
import {ProductsPageComponent} from "./components/products/products-page.component";
import {AboutPageComponent} from "./components/about-page/about-page.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductInfoPageComponent} from "./components/product-info-page/product-info-page.component";
import {StockHoldersPageComponent} from "./components/stock-holders-page/stock-holders-page.component";
import {LoginComponent} from "./components/login-page/login-page.component";
import {MainComponent} from "./components/main/main.component";
import {StockHolderInfoPageComponent} from "./components/stock-holder-info-page/stock-holder-info-page.component";
import {StockRecordsPageComponent} from "./components/stock-records-page/stock-records-page.component";

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'stock-records', component: StockRecordsPageComponent },
    { path: 'stock-holders', component: StockHoldersPageComponent },
    { path: 'stock-holders/:stockHolderId', component: StockHolderInfoPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'products/:productId', component: ProductInfoPageComponent },
    { path: 'login', component: LoginComponent },
];
