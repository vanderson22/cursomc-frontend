import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../dominio/cliente.dto';
import { ClienteService } from '../../servicos/dominio/cliente.service';
import { StorageService } from '../../servicos/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  //email: string;
  cliente: ClienteDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public service: ClienteService) {
  }

  ionViewDidLoad() {
    console.log('Start ionViewDidLoad ProfilePage');
    let user = this.storage.getLocalUser();
    if (user && user.email != null) {
      this.service.findByEmail(user.email)
        // on success 
        .subscribe(response => {
          this.cliente = response;

          //se encontrou o email buscar imagem
          this.getImageIfExists();
        }
          // on error 
          , error => {
            // se Ocorrer erro manda para home page.
            if (error.status == 403)
              this.navCtrl.setRoot('HomePage');

          });
    } else {
      // se o usuário nulo também vai para homePage
      this.navCtrl.setRoot('HomePage');

    }


    console.log('ionViewDidLoad ProfilePage End ')
  }

  // Verifica se a imagem existe 
  getImageIfExists() {
    this.service.getImageFromBucket(this.cliente.id)
      .subscribe(
        // on sucess 
        response => {
          this.cliente.imageURL = `${API_CONFIG.bucketBaseURL}/cp${this.cliente.id}.jpg`
          console.log(`Imagem encontrada no repositorio  ${API_CONFIG.bucketBaseURL}/cp${this.cliente.id}.jpg`);
        },
        // on error 
        error => {
          console.log("Imagem não foi encontrada, será utilizada a imagem blank = no Image!");
        }
      );

  }

}
