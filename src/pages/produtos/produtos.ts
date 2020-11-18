import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
      }, error => {

      }
    );

  }
}
