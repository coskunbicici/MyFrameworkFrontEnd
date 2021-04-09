import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from "./components/category/category.component";
import { ProductComponent } from "./components/product/product.component"
import { PageNotFoundComponent } from "./components/pageNotFound/pagenotfound.component"
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProductComponent },
  { path: "products", pathMatch: "full", component: ProductComponent },
  { path: "products/category/:categoryId", component: ProductComponent },
  { path: "products/add", pathMatch: "full", component: ProductAddComponent, canActivate: [LoginGuard] },
  { path: "login", pathMatch: "full", component: LoginComponent },
  /*
  { path: 'category-component', component: CategoryComponent },
  { path: 'product-component', component: ProductComponent },
  { path: '',   redirectTo: '/product-component', pathMatch: 'full' }, // redirect to `first-component`
  */
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
