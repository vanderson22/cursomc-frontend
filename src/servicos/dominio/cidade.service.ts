import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../dominio/cidade.dto";



//para ser intetável
@Injectable()
export class CidadeService{


   constructor(public http: HttpClient){

   }

   //*** Recupera categorias não esquecer de tipar/
   findAll() : Observable<CidadeDTO[]>{
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/cidades`);
   }

   buscarCidadeByIdEstado(estadoId : string) : Observable<CidadeDTO[]>{
      return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
     }
}