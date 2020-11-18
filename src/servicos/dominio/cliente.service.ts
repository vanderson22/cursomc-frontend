import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../dominio/cliente.dto";
import { ClienteNewDTO } from "../../dominio/cliente.new.dto";
import { StorageService } from "../storage.service";


@Injectable()
export class ClienteService {



   constructor(public http: HttpClient, public storage: StorageService) { }

   findByEmail(email: string): Observable<ClienteDTO> {
      //           let token =  this.storage.getLocalUser().token;
      // Não precisa mais incluir o header o interceptor fará esse papel  let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});
      return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
      //,
      //   {'headers' : authHeader}); // inclusão do header authorization na requisiçã0o
   }

   getImageFromBucket(id: String): Observable<any> {
      let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`;
      return this.http.get(url, { responseType: 'blob' });
   }

   criar(cliente: ClienteNewDTO): Observable<any> {
      
      return this.http.post(`${API_CONFIG.baseUrl}/clientes` , cliente,{
         observe: 'response', // pegar o responseHeader
         responseType: 'text'  // não fazer parse em json pois tem corpo vazio.
     });
   }
  
}