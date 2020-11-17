import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../dominio/cidade.dto';
import { EstadoDTO } from '../../dominio/estado.dto';
import { CidadeService } from '../../servicos/dominio/cidade.service';
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
    public estadoService : EstadoService) {


    // instanciar formGroup
    this.formGroup = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(120)]], // um valor default iniciar & uma lista de  Validators!
      email: ["", [Validators.email, Validators.required]],
      cpfCnpj: ["" , [Validators.required]],
      senha: [""],
      tipo: [""],
      logradouro: [""],
      numero: [""],
      complemento: [""],
      bairro: [""],
      cep: [""],
      cidadeId: [""],
      estadoId: [""],
      telefone1: [""],
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

  registrar() {
    console.log('[registrar] RegistrarPage');
    this.navCtrl.setRoot("HomePage");

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
