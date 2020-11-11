



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from '../servicos/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class Authinterceptor implements HttpInterceptor {
    

    constructor(public service: StorageService){}

    /**
     * 
     *  método que intercepta a requisição 
     * */
     // Clona a requisição para incluir meta-dados {{ cabeçalho Authorization}}
    intercept(  req: HttpRequest<any>,  next: HttpHandler, ): Observable<HttpEvent<any>> {
       
        let localUser = this.service.getLocalUser();
         console.log(`URL da API :  ${req.url}` ); 
        if(localUser ){
            if(req.url.startsWith(API_CONFIG.bucketBaseURL))
                 return next.handle(req) 
            console.log('AuthInterceptor recuperou o usuário do localstorage');
            const auth = req.clone({headers: req.headers.set('Authorization' , 'Bearer ' + localUser.token) });
            return next.handle(auth) ;

        }
        return next.handle(req) 

           }

}

//exigências do framework para rodar  o interceptor
// Registrar nos providers da APP em app.module.ts
export const AuthInterceptorProvider ={

    provide : HTTP_INTERCEPTORS,
    useClass : Authinterceptor,
    multi : true,
};
