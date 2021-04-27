import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../../Entity/Product';
import { Observable, Subject } from 'rxjs';
import { map, filter } from "rxjs/operators";
import { ServiceHelper } from '../ServiceHelper';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService extends ServiceHelper {

  constructor(private http: HttpClient) { 
    super(http);
  }

  private subject = new Subject<any>();
  public products: Product[] = [];

  public getData(filterMoteur = null) : Observable<any> {
    let res = this.getApi("products");
    //let res = this.http.get(environment.baseUrl + "Products.json");
    if (filterMoteur) {
      
      res = res.pipe<any>(map(data => {
        let t: any = data;
        return t.filter(filterMoteur);
      }));
    }
    return res;
  }

  public getTypes() : Observable<any> {
    return this.getApi("types");
  }

  public getFormats() : Observable<any> {
    return this.getApi("formats");
  }

  public getDetail(ref) : Observable<any> {
    return this.getApi(`products/${ref}`);/*.pipe<any>(map(data => {
      let t: any = data;
      return t.filter(x => x.ref == ref); 
    }));*/
  }

  public getRelatedProducts(ref) : Observable<any> {
    return this.getApi(`products/related/${ref}`);/*.pipe<any>(map(data => {
      let t: any = data;
      let product = t.find(x => x.ref == ref);
      return t.filter(x => x.type == product.type && x.format == product.format && product.ref != x.ref);
    }));*/
  }
}
