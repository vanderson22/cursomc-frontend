import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../dominio/cliente.dto";
import { StorageService } from "../storage.service";


@Injectable()
export class ClienteService {
    

     
     constructor(public http: HttpClient , public storage : StorageService) { }

     findByEmail(email : string) : Observable<ClienteDTO> {
          
        
           let token =  this.storage.getLocalUser().token;
          let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});
       
       
          return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}` ,
                      {'headers' : authHeader}); // inclusão do header authorization na requisiçã0o
     }

     getImageFromBucket(id : String) : Observable<any> {
           
        let url = `https://cors-anywhere.herokuapp.com/${API_CONFIG.bucketBaseURL}/cp${id}.jpg`;
            let header = new HttpHeaders({'Access-Control-Allow-Origin' : 'http://192.168.15.5:8100' });
        return  this.http.get(url ,  { responseType :  'blob' , 'headers' : header}) ;
     }
}