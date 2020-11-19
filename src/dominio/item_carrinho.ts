import { ProdutoDTO } from "./produto.dto";


/***
 *    Representa um item de carrinho
 * 
 * **/
export interface ItemCarrinho{
    quantidade : number,
    produto:  ProdutoDTO,
}