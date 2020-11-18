import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../dominio/cidade.dto';
import { EstadoDTO } from '../../dominio/estado.dto';
import { CidadeService } from '../../servicos/dominio/cidade.service';
import { ClienteService } from '../../servicos/dominio/cliente.service';
import { EstadoService } from '../../servicos/dominio/estado.service';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})


export class RegistrarPage {

  formGroup: FormGroup; // usar o form Builder para instanciar
  estados : EstadoDTO[];
  cidades : CidadeDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService : CidadeService,
    public estadoService : EstadoService,
    public clienteService : ClienteService,
    public alertCtrl : AlertController) {


    // instanciar formGroup
    this.formGroup = this.formBuilder.group({
      nome: ["Administrador", [Validators.required, Validators.minLength(3), Validators.maxLength(120)]], // um valor default iniciar & uma lista de  Validators!
      email: ["administrador@mail.com", [Validators.email, Validators.required]],
      cpfCnpj: ["002003001-31" , [Validators.required , Validators.minLength(11),Validators.maxLength(14), ]],
      senha: ["12345"],
      tipo: ["1" ,Validators.required  ], // PF Como default
      logradouro: ["Rua igp"],
      numero: ["3333"],
      complemento: ["bloco 20 apto 10"],
      bairro: ["Jacarépagua"],
      cep: ["22780098" , [Validators.required]],
      cidadeId: ["2s"],
      estadoId: ["1"],
      telefone1: ["123123123" , [Validators.required ]],
      telefone2: [""],
      telefone3: [""],
    }

    );
  }

  /**
   *  Realiza as querys de cidade e estado
   *  seta o primeiro estado no formgroup
  */
  ionViewDidLoad() {
     
    console.log('ionViewDidLoad RegistrarPage');
     this.estadoService.findAll().subscribe(response => {
             this.estados = response; // a lista de estados do backend
             this.formGroup.controls.estadoId.setValue(this.estados[0].id);
             this.updateCidades();

     }, 
     error =>{ });
  }
 
   /***
    * 
    *  formGroup.value  contém todos os valoes
   */
  registrar() {
    console.log('[registrar] Registar cliente ->') 
    console.log(this.formGroup.value);
   // this.navCtrl.setRoot("HomePage");
     this.clienteService.criar(this.formGroup.value)
          .subscribe( response => {
        
                     this.showInsertOK();
                   }, error => {  });
  }
  showInsertOK() {
      let alert = this.alertCtrl.create({
        message : "Usuario criado com sucesso",
        title : "Bem-Vindo!" + this.formGroup.value.nome , 
        enableBackdropDismiss : false,
        buttons : [{
             text : "OK",
             handler : () => {this.navCtrl.setRoot("HomePage") }, 
        }]
      });

       alert.present();
  }

  /***
   *  Carrega as cidades de um estado 
   */
  updateCidades() {
    console.log('[registrar] Cidades');
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.buscarCidadeByIdEstado(  estado_id ).subscribe(response => {
         
      this.cidades = response;
      // mudar a cidade no formulario
      this.formGroup.controls.cidadeId.setValue(null);
      
    }, error => { });
  }

  updateEstados() {
    console.log('[registrar] Estados');


  }

}
