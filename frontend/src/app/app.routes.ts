import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { Cart } from './cart/cart';
import { Orders } from './orders/orders';   // ✅ use Orders (not OrdersComponent)

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: Cart },
    { path: 'orders', component: Orders }     // ✅ correct
];
