import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdresseComponent } from './adresse/adresse.component';
import { FormsModule } from '@angular/forms';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';
import { PhonePipe } from './phone.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from "../shared/states/panierState";
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produits', loadChildren: () => import("./products-module/products-module.module").then(m => m.ProductsModuleModule) },
  { path: 'client', loadChildren: () => import("./client-module/client-module.module").then(m => m.ClientModuleModule) },
  { path: 'panier', loadChildren: () => import("./panier-module/panier-module.module").then(m => m.PanierModuleModule) }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdresseComponent,
    TetiereComponent,
    FooterComponent,
    HomeComponent,
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
