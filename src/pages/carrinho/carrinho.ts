import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { Carrinho } from '../../dominio/carrinho';
import { ItemCarrinho } from '../../dominio/item_carrinho';
import { CarrinhoService } from '../../servicos/dominio/carrinho.service';
import { ProdutoService } from '../../servicos/dominio/produto.service';

/**
 * Generated class for the CarrinhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  items: ItemCarrinho[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: CarrinhoService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrinhoPage');
    let carrinho: Carrinho = this.service.getCarrinho();
    this.items = carrinho.itens;
    this.carregarImagemURL();
     console.log("Carrinho Carregado com sucesso");

  }

  /***
   *    Carrega a imagem do produto se existir
   * 
  */
  carregarImagemURL() {
    this.items.forEach(item => {
      // verificando se o produto existe
      console.log(item);
      this.produtoService.pegarImagemPequena(item.produto.id).subscribe(
        // se existir seta a url do produto
        response => {
          item.produto.imageURL = `${API_CONFIG.bucketBaseURL}/prod${item.produto.id}-small.jpg`;
        }
        , error => { });
    });

  }

}
