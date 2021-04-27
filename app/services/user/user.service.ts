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
export class UserService extends ServiceHelper {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { 
    super(http);
  }

  public login(form) : Observable<any> {  
    return this.postApi("login", {login: form.login, password: form.password});
  }
}
