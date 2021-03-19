import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { AdresseComponent } from './adresse/adresse.component';
import { FormsModule } from '@angular/forms';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';
import { RecapComponent } from './recap/recap.component';
import { PhonePipe } from './phone.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from "../shared/states/panierState";
import { PanierViewComponent } from './panier-view/panier-view.component';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produits', loadChildren: () => import("./products-module/products-module.module").then(m => m.ProductsModuleModule) },
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'panier', component: PanierViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormulaireComponent,
    AdresseComponent,
    TetiereComponent,
    FooterComponent,
    RecapComponent,
    PhonePipe,
    HomeComponent,
    PanierViewComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([PanierState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
