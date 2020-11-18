import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../dominio/produto.dto';
import { ProdutoService } from '../../servicos/dominio/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produtos: ProdutoDTO[];

  constructor(public navCtrl: NavController,
    public service: ProdutoService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
    let categoria_id = this.navParams.get("categoria_id");
    console.log("Categoria : " + categoria_id);
    this.service.findByCategoria(categoria_id).subscribe(
      response => {
        this.produtos = response["content"];
        this.imageExists();
      }, error => {

      }
    );

  }

  /**
   *  Envia uma requisição para o bucket para saber se a imagem existe
   * 
   * **/
  imageExists() {
      
     
    this.produtos.forEach(produto => {
      // verificando se o produto existe
      console.log( produto);
      this.service.pegarImagemPequena(produto.id).subscribe(
        // se existir seta a url do produto
        response => {
          produto.imageURL = `${API_CONFIG.bucketBaseURL}/prod${produto.id}-small.jpg`;
        }
        , error => { });
    });


  }
}
