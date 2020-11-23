import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PagamentoDTO } from '../../dominio/PagamentoDTO';
import { PedidoDTO } from '../../dominio/pedido.dto';


@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pagamento: PagamentoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  pedido: PedidoDTO;

  form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      numeroParcelas: [1, Validators.required],
      '@type': ["pagamentoCartao", Validators.required], // no backend :@JsonTypeName(value = "pagamentoCartao")
    });

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagamentoPage');
    console.log(this.pedido);
  }

  /***
   *    Seta os campos do formulário no pedido e leva a proxima página
   *    obs: mesmo em forma de pagamento boleto as parcelas serão enviadas, porém não 
   *   farão efeito, pois o backEnd trata.
   * **/
  proximaPagina() {
    console.log(this.form.value);

    if (this.pedido) {
      if (this.form.value['@type'] == "pagamentoBoleto")
        this.form.value['numeroParcelas'] = 0;
      this.pedido.pagamento = this.form.value;

    }
    console.log(this.pedido);
    // não permitir o retorno
    this.navCtrl.setRoot("ConfirmacaoPedidoPage", { pedido: this.pedido });
  }



}
