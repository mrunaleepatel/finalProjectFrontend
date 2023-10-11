import {RouterModule,Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: 'register', component: RegisterProductComponent },
  { path: '', component: LandingComponent},
  { path: 'detail/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
