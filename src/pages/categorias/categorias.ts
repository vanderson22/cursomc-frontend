import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../dominio/categoria.dto';
import { CategoriaService } from '../../servicos/dominio/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() //lazy loading : CategoriasPage
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketURL: string = API_CONFIG.bucketBaseURL;
  elementos: CategoriaDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public catService: CategoriaService) {
  }



  //ciclo de vida da página
  //
  ionViewDidLoad() {

    //assyncrono .subscribe -- callback
    this.catService.findAll()
      .subscribe(response => {
        // função anonima que vai ser executada quando der sucesso
        console.log(response);
        console.log(this.bucketURL);
        this.elementos = response;
      },
        //on error
        error => { }//     o interceptor vai logar                 console.log(error);
      );

    console.log('ionViewDidLoad - Iniciou a paágina categorias');

  }


  mostrarProdutos() {
    this.navCtrl.push("ProdutosPage")
      ;
  }





}
