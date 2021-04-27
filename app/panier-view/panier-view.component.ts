import { Component, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import { DelReference, AddReference } from '../../shared/actions/panier.action';

@Component({
  selector: 'app-panier-view',
  templateUrl: './panier-view.component.html',
  styleUrls: ['./panier-view.component.css']
})
export class PanierViewComponent implements OnInit {

  public products = [];
  public groupBy = (list, key) => {
    return list.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.products = [];
    this.store.select(state => state.panier.panier).subscribe(list => {
      list = this.groupBy(list, "ref");
      for (let item in list) {
        this.products.push({...list[item][0], count: list[item].length});
      }
      this.products.sort((a, b) => a.ref < b.ref ? 1 : -1);
    });
    console.log(this.products);
  }

  amountChanged(event, p) {
    let newCount = event.target.value;
    if (newCount < 1) newCount = 1;
    let index = this.products.findIndex(x => x.ref == p.ref);
    let diff = Math.abs(this.products[index].count - newCount);
    if (newCount < this.products[index].count) {
      this.store.dispatch(new DelReference({ref: p.ref, count: diff}));
      this.ngOnInit();
    } else {
      this.store.dispatch(new AddReference({ref: p.ref, name: p.name, pic: p.pic, price: p.price, count: diff}));
      this.ngOnInit();
    }
  }

  deleteProduct(p) {
    let index = this.products.findIndex(x => x.ref == p.ref);
    this.store.dispatch(new DelReference({ref: p.ref, count: this.products[index].count}));
    this.ngOnInit();
  }

  getSum() {
    return this.products.reduce((acc, item) => {return acc + item.price * item.count}, 0);
  }

  buy() {
    alert(`Redirection vers formulaire de paiement pour $${this.getSum()}`);
  }
}
