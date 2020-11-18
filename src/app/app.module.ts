import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import na mão
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../servicos/dominio/categoria.service';
import { ERROR_INTERCEPTOR_PROVIDER } from '../interceptors/error-interceptor';
import { AuthService } from '../servicos/authservice';
import { StorageService } from '../servicos/storage.service';
import { ClienteService } from '../servicos/dominio/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../servicos/dominio/produto.service';


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
    HttpClientModule,
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
    AuthInterceptorProvider,
    ERROR_INTERCEPTOR_PROVIDER,
    ClienteService,
    StorageService,
    AuthService,
    CategoriaService, // um unico objeto para toda app
    ProdutoService , 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

//   export -> Permite ser importado 
export class AppModule {}
