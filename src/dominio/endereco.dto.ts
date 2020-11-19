import { CidadeDTO } from "./cidade.dto";
import { ItemCarrinho } from "./item_carrinho";


export interface EnderecoDTO {

    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade : CidadeDTO;
     

}