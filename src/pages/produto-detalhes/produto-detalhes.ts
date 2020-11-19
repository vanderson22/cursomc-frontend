import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../dominio/produto.dto';
import { CarrinhoService } from '../../servicos/dominio/carrinho.service';

/**
 * Generated class for the ProdutoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detalhes',
  templateUrl: 'produto-detalhes.html',
})
export class ProdutoDetalhesPage {

  produto: ProdutoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carrinhoService: CarrinhoService) {
  }


  // deveria fazer um find by id em produto service...para recuperar os dados do produto,
  // porém como atualmente só existem os dados que já estão na tela anterior, permanece assim.
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoDetalhesPage');
    this.produto = this.navParams.get("produto");

  }

  /***
   * 
   *   Adiciona um produto ao carrinho
   * 
  */
  adicionarProduto(produto: ProdutoDTO) {
    console.log("Produto adicionado ao carrinho : ")
    console.log(produto);
    this.carrinhoService.addProduto(produto);

    this.navCtrl.setRoot("CarrinhoPage");
  }

}
