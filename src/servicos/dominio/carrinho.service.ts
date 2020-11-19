import { Injectable } from "@angular/core";
import { Item } from "ionic-angular";
import { Carrinho } from "../../dominio/carrinho";
import { ProdutoDTO } from "../../dominio/produto.dto";
import { StorageService } from "../storage.service";


// precisa registar em app  module para estar disponivel sempre
@Injectable()
export class CarrinhoService {

    constructor(public service: StorageService) { }

    /***
     * 
     *  Cria um carrinho sem nenhum item
    */
    criarCarrinho(): Carrinho {
        let carrinho: Carrinho = {
            itens: []
        }
        return carrinho;
    }


    /***
     *   Se o carrinho não existir, criar um carrinho novo
     * **/
    getCarrinho(): Carrinho {

        let carrinho: Carrinho = this.service.getCarrinho();
        if (carrinho == null)
            carrinho = this.criarCarrinho();

        return carrinho;
    }


    /**
     *    Adiciona um produto ao carrinho, e adiciona o carrinho novamente ao local storare
     *     @param produto -> O produto que vai ser adicionado ao carrinho
     *     @returns -> Um carrinho com 1 produto adicionado.
     * **/
    addProduto(produto: ProdutoDTO): Carrinho {
        let carrinho: Carrinho = this.getCarrinho();

        let existItem = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (existItem == -1) { // nao existe
            console.log("Adicionando produto ao carrinho.")
            carrinho.itens.push({ quantidade: 1, produto: produto });
        }
        // adicionar o carrinho ao local storage
        this.service.setCarrinho(carrinho);
        return carrinho;
    }


    /**
    *    REMOVE um produto ao carrinho, e adiciona o carrinho novamente ao local storare
    *     @param produto -> O produto que vai ser removido ao carrinho
    *     @returns -> Um carrinho com 1 produto removido.
    * **/
    removerProduto(produto: ProdutoDTO): Carrinho {
        let carrinho: Carrinho = this.getCarrinho();

        let index = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (index != -1) { // nao existe
            console.log("Removendo produto ao carrinho.")
            carrinho.itens.splice(index, 1);
        }
        // adicionar o carrinho ao local storage
        this.service.setCarrinho(carrinho);
        return carrinho;
    }

    /**
   *     
   *     @param produto -> O produto que vai ser adicionado ao carrinho
   *     @returns -> Um carrinho com 1 item de produto adicionado a quantidade de produtos.
   * **/
    incrementarProduto(produto: ProdutoDTO): Carrinho {
        let carrinho: Carrinho = this.getCarrinho();

        let index = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (index != -1) { // nao existe
            console.log("Incrementando produto ao carrinho.")
            carrinho.itens[index].quantidade++;
        }
        // adicionar o carrinho ao local storage
        this.service.setCarrinho(carrinho);
        return carrinho;
    }

    /**
       *     
       *     @param produto -> O produto que vai ser adicionado ao carrinho
       *     @returns -> Um carrinho com 1 item de produto adicionado a quantidade de produtos.
       * **/
    decrementarProduto(produto: ProdutoDTO): Carrinho {
        let carrinho: Carrinho = this.getCarrinho();

        let index = carrinho.itens.findIndex(x => x.produto.id == produto.id);
        if (index != -1) { // nao existe
            console.log("Decrementando produto ao carrinho.")
            // nao pode decrementar se já for zero!
            carrinho.itens[index].quantidade--;
            if (carrinho.itens[index].quantidade == 0)
                carrinho = this.removerProduto(carrinho.itens[index].produto);

        }
        // adicionar o carrinho ao local storage
        this.service.setCarrinho(carrinho);
        return carrinho;
    }

    total(): number {
        let carrinho: Carrinho = this.getCarrinho();

        let total: number = 0;
        carrinho.itens.forEach(item => { total += item.produto.preco * item.quantidade; });

        return total;
    }

}
