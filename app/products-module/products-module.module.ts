import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from '../product-view/product-view.component';
import { MoteurRechercheComponent } from '../moteur-recherche/moteur-recherche.component';
import { DetailComponent } from '../detail/detail.component';

const appRoutes: Routes = [
  { path: "", component: ProductViewComponent },
  { path: "details/:ref", component: DetailComponent }
]

@NgModule({
  declarations: [
    ProductViewComponent,
    MoteurRechercheComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class ProductsModuleModule { }
