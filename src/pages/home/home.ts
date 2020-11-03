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

}
