import { ParseError } from '@angular/compiler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../dominio/cliente.dto';
import { EnderecoDTO } from '../../dominio/endereco.dto';
import { PedidoDTO } from '../../dominio/pedido.dto';
import { CarrinhoService } from '../../servicos/dominio/carrinho.service';
import { ClienteService } from '../../servicos/dominio/cliente.service';
import { StorageService } from '../../servicos/storage.service';

/**
 * Generated class for the EnderecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storageSerive: StorageService,
    public carrinhoService: CarrinhoService) {
  }

  ionViewDidLoad() {
    console.log('Carregando... EnderecoPage');
    let localUser = this.storageSerive.getLocalUser();
    if (localUser && localUser.email != null) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          console.log(response['enderecos']);
          this.items = response['enderecos']; // com colchetes para o compilador não reclamar 
          // pegar o carrinho para recuperar os dados do produto para a próxima pagina
          let carrinho = this.carrinhoService.getCarrinho();

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoEntrega: null, // está na pagina de saber o endereço
            pagamento: null, // vai como nulo pois será escolhido na próxima página
            // atenção ao return 
            itens: carrinho.itens.map(item => {
              // retorna um carrinhoItem que possui quantidade e um RefDto
              return {
                quantidade: item.quantidade,
                produto: {
                  id: item.produto.id
                }
              };
            })

          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomegaPage");
          }
        }
      );
    }
    else
      this.navCtrl.setRoot("HomePage");

  }

  /**
   * 
   *  Após selecionar o endereço de entrega ,
   * recuperar o id e incluir no pedido
   * 
   * a próxima página será do pagamento
  */
  proximaPagina(endereco: EnderecoDTO) {

    this.pedido.enderecoEntrega = { id: endereco.id };
    console.log(this.pedido)
    this.navCtrl.push("PagamentoPage" , { pedido: this.pedido });
  }

}
