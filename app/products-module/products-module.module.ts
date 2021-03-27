import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from '../product-view/product-view.component';
import { MoteurRechercheComponent } from '../moteur-recherche/moteur-recherche.component';

const appRoutes: Routes = [
  { path: "", component: ProductViewComponent },
  { path: "details/:ref", loadChildren: () => import("../detail-module/detail-module.module").then(m => m.DetailModuleModule) }
]

@NgModule({
  declarations: [
    ProductViewComponent,
    MoteurRechercheComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class ProductsModuleModule { }
