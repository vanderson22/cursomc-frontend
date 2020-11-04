import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

//Para o ionic entender que pode referenciar a classe como string "HomePage"
@IonicPage()

//Este é o motivo dele ser o controlador, ele controla a página Home.html
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//Controlador da view home.html
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  //publico 
  public login(){
     // já estava injetado pois estava no construtor 
       //push -> navegar    
    // Navegação impilhada  this.navCtrl.push('CategoriasPage'); tem um botão de voltar 
    this.navCtrl.setRoot('CategoriasPage');
   }

}
