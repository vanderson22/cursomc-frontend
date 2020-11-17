import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadeService } from '../../servicos/dominio/cidade.service';
import { EstadoService } from '../../servicos/dominio/estado.service';
import { RegistrarPage } from './registrar';

@NgModule({
  declarations: [
    RegistrarPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarPage),
  ],
  providers :[
    CidadeService,
    EstadoService,
  ]
})

//ATENÇÃO os serviços de estados e cidades só serão instanciados aqui E NÃO em app.module
export class RegistrarPageModule {}
