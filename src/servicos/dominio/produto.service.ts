import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../dominio/categoria.dto";
import { ProdutoDTO } from "../../dominio/produto.dto";



//para ser intetável
@Injectable()
export class ProdutoService {


   constructor(public http: HttpClient) {

   }

   /**
    *  Realiza a busca pagina de produtos
    * ***/
   findByCategoria(categoria_id: string): Observable<ProdutoDTO[]> {

      return this.http
         .get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/page?categorias=${categoria_id}`);
   }

   /**
    *  Pega a imagem miniatura do bucket
    *   @param id -> o identificador da imagem  
    * **/
   pegarImagemPequena(id: string): Observable<any> {
      console.log("[produto Service] Identificador do produto " + id);
      let url = `${API_CONFIG.bucketBaseURL}/prod${id}-small.jpg`;
      console.log("[produto service] Url da imagem : " + url);
      return this.http.get(url, { responseType: 'blob' });
   }
}