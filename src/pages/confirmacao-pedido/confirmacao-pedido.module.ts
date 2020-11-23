import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoService } from '../../servicos/dominio/pedido.service';
import { ConfirmacaoPedidoPage } from './confirmacao-pedido';

@NgModule({
  declarations: [
    ConfirmacaoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmacaoPedidoPage),
  ],
  providers: [PedidoService]
})
export class ConfirmacaoPedidoPageModule {}
