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
    let res = this.http.get(environment.baseUrl);
    if (filterMoteur) {
      
      res = res.pipe<any>(map(data => {
        let t: any = data;
        return t.filter(filterMoteur);
      }));
    }
  
    return res;
  }

}
