import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanierViewComponent } from '../panier-view/panier-view.component';

const appRoutes: Routes = [
  { path: "", component: PanierViewComponent}
]

@NgModule({
  declarations: [
    PanierViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class PanierModuleModule { }
