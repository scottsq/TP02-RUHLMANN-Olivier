import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { CompteClientComponent } from '../compte-client/compte-client.component';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { RecapComponent } from '../recap/recap.component';
import { PhonePipe } from '../phone.pipe';

const appRoutes: Routes = [
  {path: "", component: RecapComponent}
];

@NgModule({
  declarations: [
    FormulaireComponent,
    CompteClientComponent,
    RecapComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class ClientModuleModule { }
