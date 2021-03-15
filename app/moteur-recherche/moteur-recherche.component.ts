import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-moteur-recherche',
  templateUrl: './moteur-recherche.component.html',
  styleUrls: ['./moteur-recherche.component.css']
})
export class MoteurRechercheComponent implements OnInit {

  constructor() { }

  private min: number = 0;
  private max: number = 0;

  ngOnInit(): void {
  }

  @Output()
  e: EventEmitter<any> = new EventEmitter<any>();
  
  resetFilters() {
    this.min = 0;
    this.max = 0;
    document.querySelector<any>("#priceMin").value = 0;
    document.querySelector<any>("#priceMax").value = 0;
    document.querySelector<any>("#inputName").value = "";
    this.e.emit(null);
  }

  nameKeyUp(e) {
    let val = e.target.value.toLowerCase();
    let func;
    if (this.max != 0) func = x => x.name.toLowerCase().includes(val) && x.price >= this.min && x.price <= this.max;
    else func = x => x.name.toLowerCase().includes(val);
    this.e.emit(func);
  }

  priceMinChange(e) {
    this.min = parseInt(e.target.value);
  }
  priceMaxChange(e) {
    this.max = parseInt(e.target.value);
  }

  betweenPrices() {
    let val = document.querySelector<any>("#inputName").value;
    let func;
    if (val != "") func = x => x.name.toLowerCase().includes(val) && x.price >= this.min && x.price <= this.max;
    else func = x => x.price >= this.min && x.price <= this.max;
    this.e.emit(func);
  }
}
