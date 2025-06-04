import {Routes} from '@angular/router';
import {ProductsPageComponent} from "./components/products/products-page.component";
import {AboutPageComponent} from "./components/about-page/about-page.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductInfoPageComponent} from "./components/product-info-page/product-info-page.component";
import {StocksPageComponent} from "./components/stocks-page/stocks-page.component";
import {StockHoldersComponent} from "./components/stock-holders-page/stock-holders.component";
import {LoginComponent} from "./components/login-page/login-page.component";
import {MainComponent} from "./components/main/main.component";

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'stocks', component: StocksPageComponent },
    { path: 'stock-holders', component: StockHoldersComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'products/:productId', component: ProductInfoPageComponent },
    { path: 'login', component: LoginComponent },
];
