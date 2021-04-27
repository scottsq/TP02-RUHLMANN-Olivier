import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class ServiceHelper {
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };

    constructor(private httpClient: HttpClient) {}

    public getApi(path: String): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}${path}`, this.httpOptions);
    }

    public postApi(path: String, body: any): Observable<any> {
        console.log(`${environment.baseUrl}${path}`);
        return this.httpClient.post(`${environment.baseUrl}${path}`, body ? body : null);
    }
}