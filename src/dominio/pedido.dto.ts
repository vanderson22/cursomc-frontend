import { ItemPedidoDTO } from "./Item_pedido.dto";
import { PagamentoDTO } from "./PagamentoDTO";
import { RefDTO } from "./RefDTO";



export interface PedidoDTO{
      cliente : RefDTO,
      enderecoEntrega : RefDTO,
      pagamento : PagamentoDTO,
      itens : ItemPedidoDTO[]; 
}