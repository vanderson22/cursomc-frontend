import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  email: string;

  constructor(public navCtrl   : NavController, 
              public navParams : NavParams,
              public storage   : StorageService ) {
  }

  ionViewDidLoad() {
    console.log('Start ionViewDidLoad ProfilePage');
         let user = this.storage.getLocalUser();
          if(user && user.email != null)
              this.email = user.email;

 
          
    console.log('ionViewDidLoad ProfilePage End ')
  }

}
