import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { $ } from 'protractor';
import { Store } from '@ngxs/store';
import { ProductServiceService } from '../services/product/product-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-moteur-recherche',
  templateUrl: './moteur-recherche.component.html',
  styleUrls: ['./moteur-recherche.component.css']
})
export class MoteurRechercheComponent implements OnInit {

  constructor(private pService: ProductServiceService, private store: Store) { }

  @Input()
  public maxPrice: number = 1;
  public max: number = 0;
  private name: string = "";
  private type: string = "";
  private format: string = "";
  @Output()
  e: EventEmitter<any> = new EventEmitter<any>();
  public types: Observable<any>;
  public formats: Observable<any>;
  
  ngOnInit(): void {
    this.types = this.pService.getTypes();
    this.formats = this.pService.getFormats();
  }

  resetFilters() {
    this.max = 0;
    document.querySelector<any>("#priceMax").value = 0;
    document.querySelector<any>("#inputName").value = "";
    document.querySelector<any>("#selectType").value = "";
    document.querySelector<any>("#selectFormat").value = "";
    this.e.emit(null);
  }

  nameKeyUp(e) {
    this.name = e.target.value.toLowerCase();
    this.e.emit(this.buildFunc());
  }

  priceMaxChange(e) {
    this.max = parseInt(e.target.value);
  }

  byType() {
    this.type = document.querySelector<any>("#selectType").value;  
    this.e.emit(this.buildFunc());
  }

  byFormat() {
    this.format = document.querySelector<any>("#selectFormat").value;
    this.e.emit(this.buildFunc());
  }

  filterDisplay(e) {
    let btn = e.target;
    let div: any = document.getElementById("div-filter");
    if (!div.classList.contains("wrapper-active")) {
      div.classList.add("wrapper-active");
      btn.innerText = btn.innerText.replace("▼", "▲");
    }
    else {
      div.classList.remove("wrapper-active");
      btn.innerText = btn.innerText.replace("▲", "▼");
    }
  }

  buildFunc() {
    return x => {
      let res: boolean = x.name.toLowerCase().includes(this.name.toLowerCase());
      if (this.max > 0) res = res && x.price < this.max;
      if (this.type != "") res = res && x.type.toLowerCase() == this.type.toLowerCase();
      if (this.format != "") res = res && x.format.toLowerCase() == this.format.toLowerCase();
      return res;
    }
  }
}
