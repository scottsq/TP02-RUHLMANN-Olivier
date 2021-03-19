import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../../Entity/Product';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();
  public products: Product[] = [];

  public getData(filterMoteur = null) : Observable<any> {
    let res = this.http.get(environment.baseUrl + "Products.json");
    if (filterMoteur) {
      
      res = res.pipe<any>(map(data => {
        let t: any = data;
        return t.filter(filterMoteur);
      }));
    }
    return res;
  }

  public getTypes() : Observable<any> {
    return this.http.get(environment.baseUrl + "Types.json");
  }

  public getFormats() : Observable<any> {
    return this.http.get(environment.baseUrl + "Formats.json");
  }

  public getDetail(ref) : Observable<any> {
    return this.http.get(environment.baseUrl + "Products.json").pipe<any>(map(data => {
      let t: any = data;
      return t.filter(x => x.ref == ref); 
    }));    
  }

  public getRelatedProducts(ref) : Observable<any> {
    return this.http.get(environment.baseUrl + "Products.json").pipe<any>(map(data => {
      let t: any = data;
      let product = t.find(x => x.ref == ref);
      return t.filter(x => x.type == product.type && x.format == product.format && product.ref != x.ref);
    }));
  }
}
