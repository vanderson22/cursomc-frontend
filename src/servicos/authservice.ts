import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../dominio/credencias.dto";


@Injectable()
export class AuthService {


    constructor(public http: HttpClient){


    }
     autenticar(creds : CredenciaisDTO){
            // retorna observable<any>
            console.log(`${API_CONFIG.baseUrl}/login`);
            console.log(creds);
        return   this.http.post(`${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response', // pegar o responseHeader
                responseType: 'text'  // não fazer parse em json pois tem corpo vazio.
            }) ;
     }

}