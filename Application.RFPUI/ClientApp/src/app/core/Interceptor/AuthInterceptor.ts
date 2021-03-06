import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('notoken') !== 'noToken') {
      let token = sessionStorage.getItem('token');

      if (token != null && token) {
        request = request.clone({
          setHeaders: {
            AuthToken: `${token}`,
          }
        });
      }
      
    }
    //return next.handle(request).do((event: HttpEvent<any>) => {
    //  if (event instanceof HttpResponse) {
    //  }
    //}, (err: any) => {
    //  if (err instanceof HttpErrorResponse) {
    //    if (err.status === 401) {
    //      sessionStorage.removeItem('token');
    //      this.router.navigate(['/login']);
    //    }
    //  }
    //});

    return next.handle(request);
  }
}
