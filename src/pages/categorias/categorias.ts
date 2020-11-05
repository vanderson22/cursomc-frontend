import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams
             , public catService: CategoriaService) {
  }



  //ciclo de vida da página
  //
  ionViewDidLoad() {
     
     //assyncrono .subscribe -- callback
    this.catService.findAll()
        .subscribe( response  =>  {
              // função anonima que vai ser executada quando der sucesso
             console.log(response);
        } ,
        //on error
                     error => {
                        console.log(error);
                        
                     }
        );

    console.log('ionViewDidLoad - Iniciou a paágina categorias');


  }
    

      
     
    
}
