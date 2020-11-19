import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../dominio/endereco.dto';

/**
 * Generated class for the EnderecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  items: EnderecoDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('Carregando... EnderecoPage');
    this.items = [
      {
        id: "1",
        logradouro: "Rua do jacaré",
        numero: "207",
        complemento: "",
        bairro: "Camorim",
        cep: "2222-222",
        cidade: { id: "1", nome: "Rio de janeiro", estado: { id: "1", nome: "RJ" } }
      },
      {
        id: "2",
        logradouro: "Rua Igarapé-açu",
        numero: "307",
        complemento: "",
        bairro: "Curicica",
        cep: "22780-888",
        cidade: { id: "1", nome: "Rio de janeiro", estado: { id: "1", nome: "RJ" } }
      },
    ];
  }

}
