import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../dominio/estado.dto";



//para ser intetável
@Injectable()
export class EstadoService{


   constructor(public http: HttpClient){

   }

   //*** Recupera categorias não esquecer de tipar/
   findAll() : Observable<EstadoDTO[]>{
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
   }

  
}