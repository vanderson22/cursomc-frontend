import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 

// Decorator -> Configurações para alterar a classe 
@NgModule({
  declarations: [
    MyApp // nome da classe principal declarada em app.component.ts
    //HomePage Removido e criado um subModulo
    //ListPage
  ],
  // Lista de módulos que vão ser importados 
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), // declarou o principal
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    //HomePage
    //ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

//   export -> Permite ser importado 
export class AppModule {}
