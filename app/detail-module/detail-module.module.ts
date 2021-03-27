import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from '../detail/detail.component';

const appRoutes: Routes = [
  {path: "", component: DetailComponent}
];

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class DetailModuleModule { }
