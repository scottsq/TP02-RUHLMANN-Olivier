import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product/product-service.service';
import { Product } from '../../Entity/Product';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddReference } from '../../shared/actions/panier.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(private pService: ProductServiceService, private store: Store, private router: Router) { }

  public observator: Observable<any>;

  ngOnInit() {
    this.store.select(state => state.connection.connection).subscribe(c => { if (c == null) this.router.navigate(["/client"])});
    this.observator = this.pService.getData();
  }

  async getData(e = null) {    
    this.observator = await this.pService.getData(e);
  }

  addPanier(p: Product) {
    let elem: any = document.getElementById(p.ref);
    let count = elem.value;
    if (count < 1) count = 1;
    this.store.dispatch(new AddReference({ref: p.ref, name: p.name, price: p.price, pic: p.pic, format: p.format, amount: p.amount, count: count}));
  }
}
