import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../servicos/authservice';

// não precisa mais pois na Linha 19 foi referenciado string import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})

// MyApp nome da classe principal
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //@IonicPage()
  // troca desse  rootPage: any = HomePage; por 
  rootPage: string = 'HomePage';


  pages: Array<{ title: string, component: string }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authservice: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Logout', component: '' },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string, component: string }) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log("Open Page " + page.title);
    switch (page.title) {

      case "Logout": {
        this.authservice.logout();
        console.log("Direcionando para home Page");
        this.nav.setRoot("HomePage");
      }
        break;
      default: this.nav.setRoot(page.component);
    }

  }

}

