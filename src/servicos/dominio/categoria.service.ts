import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../dominio/categoria.dto";



//para ser intetável
@Injectable()
export class CategoriaService{


   constructor(public http: HttpClient){

   }

   //*** Recupera categorias não esquecer de tipar/
   findAll() : Observable<CategoriaDTO[]>{
         

    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
       // return this.http.get( http://localhost:8081/categorias)
   }
}