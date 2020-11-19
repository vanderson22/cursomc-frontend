import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../dominio/credencias.dto";
import { LocalUser } from "../dominio/local_user";
import { CarrinhoService } from "./dominio/carrinho.service";
import { StorageService } from "./storage.service";




@Injectable()
export class AuthService {

    helper: JwtHelper = new JwtHelper();
    constructor(public http: HttpClient,
                public storageService: StorageService,
                public carrinhoService : CarrinhoService) {


    }
    autenticar(creds: CredenciaisDTO) {
        // retorna observable<any>
        console.log(`${API_CONFIG.baseUrl}/login`);
        console.log(creds);
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response', // pegar o responseHeader
                responseType: 'text'  // não fazer parse em json pois tem corpo vazio.
            });
    }


    refreshToken(token: string): Observable<any> {
        // retorna observable<any>
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {},
            {
                observe: 'response', // pegar o responseHeader
                responseType: 'text'  // não fazer parse em json pois tem corpo vazio.
            });
    }

    //Armazena o usuário recuperado no local storage
    loginSucesso(authHeader: string) {
        // Para remover Bearer "token"
        console.log(`Token recuperado ${authHeader}`);
        let splitToken = authHeader.substring(7);

        let usuario: LocalUser = {
            token: splitToken,
            email: this.helper.decodeToken(splitToken).sub,

        };

        this.storageService.setLocalUser(usuario);
       // LIMPAR CARRINHO!
        this.carrinhoService.getCarrinho();
        console.log(this.storageService.getLocalUser());
    }

    /**
     * 
     *  Realiza o logout , ao setar null no usuário do LocalStorage
    */
    logout() {
        this.storageService.setLocalUser(null);
    }

}