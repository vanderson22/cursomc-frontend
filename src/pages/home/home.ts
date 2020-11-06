import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../dominio/credencias.dto';

//Para o ionic entender que pode referenciar a classe como string "HomePage"
@IonicPage()

//Este é o motivo dele ser o controlador, ele controla a página Home.html
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//Controlador da view home.html
export class HomePage {

     creds: CredenciaisDTO ={
        email: "",
        senha: ""
     };
      
  constructor(public navCtrl: NavController  , public meuMenu: MenuController) {

  }

   
  
  //publico 
  public login(){
     // já estava injetado pois estava no construtor 
       //push -> navegar    
    // Navegação impilhada  this.navCtrl.push('CategoriasPage'); tem um botão de voltar 

     console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
   }

   ionViewWillEnter(){
    console.log('ionViewWillEnter - Entrando na paágina categorias');
    this.meuMenu.swipeEnable(false);
   }
   ionViewDidLeave(){
    console.log('ionViewDidLeave - Saindo na paágina categorias');
    this.meuMenu.swipeEnable(true);
   }

}
