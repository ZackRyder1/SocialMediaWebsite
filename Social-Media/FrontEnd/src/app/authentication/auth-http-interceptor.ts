import { Injectable } from '@angular/core';

import{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{

  

    intercept(req:HttpRequest<any> , next: HttpHandler):Observable<HttpEvent<any>>{  

        if(localStorage.getItem('token'))
        {
            const modifiedReq = req.clone({
            headers : req.headers.set('Authorization',localStorage.getItem('token'))
            });

            return next.handle(modifiedReq);
        }
        else {
            return next.handle(req);
        }
    }
}
