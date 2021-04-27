import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse,
	HttpHeaders
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

	jwtToken: String = "";
	httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
	};
	
	constructor(private router: Router) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log({jwtToken: this.jwtToken});

		if (this.jwtToken != "") {
			request = request.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` }});
		}
		return next.handle(request).pipe(
			tap((evt: HttpEvent<any>) => this.handleToken(evt, request), (error: HttpErrorResponse) => this.handleErrors(error))
		);
	}



	handleToken(evt: HttpEvent<any>, req: HttpRequest<any>) {
		if (evt instanceof HttpResponse) {
			let tab: Array<String>;
			let headerAuthorization = evt.headers.get("Authorization");
			if (headerAuthorization != null) {
				tab = headerAuthorization.split(/Bearer\s+(.*)$/i);
				if (tab.length > 1) this.jwtToken = tab[1];
			}
		}		
	}

	handleErrors(error: HttpErrorResponse) {
		console.log(error.message);
		switch (error.status) {
			case 400:
			case 401: this.router.navigate(['client']);
		}
		return of(null);
	}
}
