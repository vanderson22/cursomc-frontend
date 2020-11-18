



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
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../dominio/fieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
        public alertCtrl: AlertController) { }


    // método que intercepta a requisição e pega se houver erro
    intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        return next.handle(req).catch
            ((error, caught) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                // se nao tem status não é formato json
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                console.log(`Error interceptor Ativado  ${JSON.stringify(errorObj)}`);

                console.log(errorObj);
                console.log(`Status caputado ${errorObj.status}`);
                switch (errorObj.status) {
                    case 401: this.tratarErros401();
                        break;
                    case 403: this.tratarErros403();
                        break;
                    case 422: this.tratarErros422(errorObj);
                        break;
                    default: this.tratarErrosAleatorios(errorObj);
                        break;
                }
                return Observable.throw(errorObj);
            }) as any
    }
    tratarErros422(errorObj: any) {
        let alert = this.alertCtrl.create({
            message: this.listarErros(errorObj.errors),
            subTitle: "código http: " + errorObj.status,
            title: errorObj.error,
            enableBackdropDismiss: false, // usuário é  obrigado a tocar no botão
            buttons: [{
                text: "Ok"
            }]
        });
        // mostrar o alerta !
        alert.present();


    }
    /*
     *  
     *  Retorna uma lista de erros formata como html
     **/
    listarErros(fieldMessages: FieldMessage[]): string {
        let s = "";

        fieldMessages.forEach(fieldMessage => {
            s += "<p style=' color: red; padding-top: 0.2rem;'>Campo inválido: "
                  + fieldMessage.campo + " </p> Erro: " + fieldMessage.mensagem;
        });

        return s;
    }
    tratarErrosAleatorios(errorObj: any) {
        let alert = this.alertCtrl.create({
            message: errorObj.message,
            // title   : "Erro 401 - Falha na autenticação",
            title: "Error : " + errorObj.status + " : " + errorObj.error,
            enableBackdropDismiss: false, // usuário é  obrigado a tocar no botão
            buttons: [{
                text: "Ok"
            }]
        });
        // mostrar o alerta !
        alert.present();

    }






    tratarErros401() {
        let alert = this.alertCtrl.create({
            message: "Email ou senhas incorretos",
            // title   : "Erro 401 - Falha na autenticação",
            title: "Falha de autenticação",
            enableBackdropDismiss: false, // usuário é  obrigado a tocar no botão
            buttons: [{
                text: "Ok"
            }]
        });
        // mostrar o alerta !
        alert.present();
    }
    // Trata os erros 403.      
    tratarErros403() {
        this.storage.setLocalUser(null);
    }

}

//exigências do framework para rodar  o interceptor
// Registrar nos providers da APP em app.module.ts
export const ERROR_INTERCEPTOR_PROVIDER = {

    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
