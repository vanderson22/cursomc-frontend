import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../dominio/credencias.dto";
import { LocalUser } from "../dominio/local_user";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthService {


    constructor(public http: HttpClient , public storageService : StorageService){


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

     //Armazena 
     loginSucesso(authHeader: string){
                  // Para remover Bearer "token"
        console.log(`Token recuperado ${authHeader}`);
         let splitToken = authHeader.substring(7);
          
         let usuario  : LocalUser = {
                 token : splitToken
         } ;
        
          this.storageService.setLocalUser(usuario);
           console.log(this.storageService.getLocalUser());
     }

     logout(){
         this.storageService.setLocalUser(null);
     }

}