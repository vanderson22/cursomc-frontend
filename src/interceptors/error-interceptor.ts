



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    // método que intercepta a requisição e pega se houver erro
    intercept(  req: HttpRequest<any>,  next: HttpHandler, ): Observable<HttpEvent<any>> {
        return next.handle(req).catch
            ((error , caught) => { 
                let errorObj = error;
                if (errorObj.error){
                    errorObj = errorObj.error;
                }
// se nao tem status não é formato json
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }
                console.log(`Error interceptor Ativado  ${JSON.stringify(errorObj)}` );
            
               return Observable.throw(errorObj);
            })as any
           }

}

//exigências do framework para rodar  o interceptor
// Registrar nos providers da APP em app.module.ts
export const ERROR_INTERCEPTOR_PROVIDER ={

    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};
