import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../service/product-service.service';
import { Product } from '../../Entity/Product';
import { Observable } from '../../../node_modules/rxjs';
import { Store } from '@ngxs/store';
import { AddReference } from '../../shared/actions/panier.action';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(private pService: ProductServiceService, private store: Store) { }

  public observator: Observable<any>;

  ngOnInit() {
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
