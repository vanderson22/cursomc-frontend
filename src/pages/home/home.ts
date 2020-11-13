import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../dominio/credencias.dto';
import { AuthService } from '../../servicos/authservice';
import { StorageService } from '../../servicos/storage.service';

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
      
  constructor(public navCtrl: NavController  , 
             public meuMenu: MenuController, 
             public auth: AuthService,
             public storageService: StorageService) {

  }

   
  
  //publico 
  public login(){
     // já estava injetado pois estava no construtor 
       //push -> navegar    
    // Navegação impilhada  this.navCtrl.push('CategoriasPage'); tem um botão de voltar 

     console.log(this.creds);
     this.auth.autenticar(this.creds)
     // ao receber a resposta tenta pegar o authHeader para setar no localstorage
        .subscribe(response => { 
           this.auth.loginSucesso(response.headers.get("Authorization")) 
           this.navCtrl.setRoot('CategoriasPage');
        }, 
            error => {  } // faz nada on error 
             );

   
   }
    /****
     * 
     *  Tenta pegar o usuário do localstorage, se conseguir, tenta dar um refresh token
     * */
    
    ionViewDidEnter(){

       console.log("[ionViewDidEnter] = Entrando na página home");
       
       if( this.storageService.getLocalUser() && this.storageService.getLocalUser().token != null ) {

           this.auth.refreshToken(this.storageService.getLocalUser().token )
      // ao receber a resposta tenta pegar o authHeader para setar no localstorage
             .subscribe(response => { 
               
              this.auth.loginSucesso(response.headers.get('Authorization'))
           
               this.navCtrl.setRoot('CategoriasPage');
         }, 
             error => {  } // faz nada on error 
              );

      }else {
             console.log("Usuário não foi recuperado do localStorage, logue novamente")  
      }

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
