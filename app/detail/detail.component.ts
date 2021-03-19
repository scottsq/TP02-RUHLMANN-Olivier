import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../service/product-service.service';
import { Observable } from '../../../node_modules/rxjs';
import { Store } from '../../../node_modules/@ngxs/store';
import { AddReference } from '../../shared/actions/panier.action';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  ref: string = "";
  product: Observable<any>;
  relatedProducts: Observable<any>;

  constructor(private route: ActivatedRoute, private pService: ProductServiceService, private store: Store) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => this.loadData(p.ref));
  }

  loadData(ref) {
    this.ref = ref;
    this.product = this.pService.getDetail(this.ref);
    this.relatedProducts = this.pService.getRelatedProducts(this.ref);
  }

  addToCart(p) {
    this.store.dispatch(new AddReference({ref: p.ref, count: document.querySelector<any>("#amount").value, amount: p.amount, format: p.formay, name: p.name, pic: p.pic, price: p.price}));
  }

}
