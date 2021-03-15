import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../service/product-service.service';
import { Product } from '../../Entity/Product';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  constructor(private pService: ProductServiceService) { }

  public observator: Observable<any>;

  ngOnInit() {
    this.observator = this.pService.getData();
  }

  async getData(e = null) {    
    this.observator = await this.pService.getData(e);
  }

}
