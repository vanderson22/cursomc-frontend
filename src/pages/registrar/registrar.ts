import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  nome: string;
  email: string;
  cpfCnpj: string;
  senha: string;
  tipo: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidadeId: string;
  estadoId: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;

  
    
  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  registrar() {
    console.log('[registrar] RegistrarPage');
    console.log(this.nome + " " + this.cpfCnpj) ;
    this.navCtrl.setRoot("HomePage");

  }
  updateCidades() {
    console.log('[registrar] Cidades');
    console.log(this.nome);

  }

  updateEstados() {
    console.log('[registrar] Estados');
  

  }

}
