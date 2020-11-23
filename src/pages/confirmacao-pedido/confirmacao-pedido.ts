import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../dominio/cliente.dto';
import { EnderecoDTO } from '../../dominio/endereco.dto';
import { ItemCarrinho } from '../../dominio/item_carrinho';
import { PedidoDTO } from '../../dominio/pedido.dto';
import { CarrinhoService } from '../../servicos/dominio/carrinho.service';
import { ClienteService } from '../../servicos/dominio/cliente.service';
import { PedidoService } from '../../servicos/dominio/pedido.service';

/**
 * Generated class for the ConfirmacaoPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmacao-pedido',
  templateUrl: 'confirmacao-pedido.html',
})
export class ConfirmacaoPedidoPage {

  pedido: PedidoDTO;
  items: ItemCarrinho[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  codpedido: string = null;

  constructor(public navCtrl: NavController,
    public carrinhoService: CarrinhoService,
    public navParams: NavParams,
    public clienteService: ClienteService, public pedidoService: PedidoService) {
    this.pedido = this.navParams.get("pedido");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmacaoPedidoPage');
    this.items = this.carrinhoService.getCarrinho().itens;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      response => {

        console.log(response['enderecos']);
        this.endereco = this.getEndereco(response['enderecos'], this.pedido.enderecoEntrega.id);
        this.cliente = response as ClienteDTO;
      },
      error => {
        // ON ERROR
        console.log("Ocorreu erro on load");
        this.navCtrl.setRoot("HomePage");
      }
    );
  }


  /***
   * 
   *    busca o endereço de entrega na base de dados
   * 
  */
  getEndereco(enderecos: EnderecoDTO[], id: string): EnderecoDTO {
    let endereco: EnderecoDTO;

    enderecos.forEach(end => { if (end.id == id) endereco = end; });
    console.log(endereco);
    return endereco;
  }

  total(): number {
    return this.carrinhoService.total();
  }

  home() {
      this.navCtrl.setRoot("CarrinhoPage")
  }

  /**
   * Registrar o pedido e limpa o carrinho
   */ 
  registrarPedido() {

    this.pedidoService.insert(this.pedido).subscribe(
        response => {   console.log(response.headers.get("location") ) 
                 this.carrinhoService.criarCarrinho();  }
          // para o location funcionar precisa expor o header location no backend
        , error =>  {   if(error.startus == 403) this.navCtrl.setRoot("HomePage")}
    );
    }



}
