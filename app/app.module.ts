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
import { ProductViewComponent } from './product-view/product-view.component';
import { MoteurRechercheComponent } from './moteur-recherche/moteur-recherche.component';

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
    ProductViewComponent,
    MoteurRechercheComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
