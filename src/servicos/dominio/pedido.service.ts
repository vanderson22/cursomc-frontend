import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../dominio/categoria.dto";
import { PedidoDTO } from "../../dominio/pedido.dto";



//para ser intetável
@Injectable()
export class PedidoService {


    constructor(public http: HttpClient) {

    }

    //*** Recupera categorias não esquecer de tipar/
    insert(pedido: PedidoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido,
            {
                observe: "response",
                responseType: "text",
            });
    }
}