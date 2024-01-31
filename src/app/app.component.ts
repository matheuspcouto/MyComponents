import { LoaderService } from './shared/components/loader/loader.service';
import { Component, ViewChild } from '@angular/core';
import { ModalComponent, TipoModal } from './shared/components/modal/modal.component';
import { Rotas } from './shared/enums/rotas-enum';
import { FluxoErro } from './shared/fluxo-erro';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, telefoneValidator, AppValidator, cnpjValidator, cpfValidator } from './app.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyComponents';
  hide = true;
  erro: any;
  mascaraTelefone = '(00) 00000-0000';
  mascaraCpfCnpj = '000.000.000-009';
  tiposMembro = ['Membro', 'Líder', 'Pastor'];
  sexos = ['Masculino', 'Feminino'];
  @ViewChild('modal', { static: true }) modal: ModalComponent | undefined;

  formGroup: FormGroup = this.formBuild.group({
    nome: [null, Validators.required],
    sobrenome: [null, Validators.required],
    idade: [null, Validators.required],
    dataNasc: [null, Validators.required],
    telefone: [null, telefoneValidator],
    cpfCnpj: [null, Validators.required],
    descricao: [null],
    email: [null, emailValidator],
    senha: [null, Validators.required],
    tipoMembroSelecionado: [this.tiposMembro[0]],
    batizado: [false],
  }, {
    validators: [(formGroup: FormGroup) => {
      const appValidator = new AppValidator();
      const cpfCnpj = formGroup.get('cpfCnpj');
      const telefone = formGroup.get('telefone');
      const dataNasc = formGroup.get('dataNasc');

      cpfCnpj?.valueChanges.subscribe((value) => {
        this.mascaraCpfCnpj = value.length > 11 ? '00.000.000/0000-00' : '000.000.000-009';
      });

      if (cpfCnpj?.value && !appValidator.isValidCpfCnpj(cpfCnpj.value)) {
        cpfCnpj.setErrors({ 'formatoInvalido': true });
      }

      if (telefone?.value && !appValidator.isValidTelefone(telefone.value)) {
        telefone.setErrors({ 'formatoInvalido': true });
      }

      if (dataNasc?.value && !appValidator.isValidDataNascimento(dataNasc.value)) {
        dataNasc.setErrors({ 'formatoInvalido': true });
      }
    }]
  });

  batizado: boolean = false;

  constructor(private notificationService: ToastrService, private formBuild: FormBuilder, private loaderService: LoaderService) { }

  abrirModalConfirmacao() {
    const MODAL = {
      titulo: 'Modal de Confirmação',
      texto: 'Este é um modal de confirmação',
      textoBotao: 'OK',
      botao: () => console.log('Modal Aberto'),
      textoSegundoBotao: 'Fechar',
      segundoBotao: () => { console.log('Modal Fechado'); this.modal?.fecharModal(); },
    }

    this.modal?.abrirModal(MODAL, TipoModal.CONFIRMACAO);
  }

  abrirModalSucesso() {
    const MODAL = {
      titulo: 'Modal de Sucesso',
      texto: 'Parabéns, você conseguiu realizar uma ação com sucesso',
      textoBotao: 'OK',
      botao: () => console.log('Modal Aberto'),
      textoSegundoBotao: 'Fechar',
      segundoBotao: () => { console.log('Modal Fechado'); this.modal?.fecharModal(); },
      imagem: 'sucesso.png',
    }

    this.modal?.abrirModal(MODAL, TipoModal.SUCESSO);
  }

  abrirModalErro() {
    this.erro = new FluxoErro().construirErro({}, Rotas.HOME);

    const MODAL = {
      titulo: this.erro.titulo,
      texto: this.erro.mensagem,
      textoBotao: 'OK',
      imagem: 'error.png',
      botao: () => this.modal?.fecharModal(),
    }

    this.modal?.abrirModal(MODAL, TipoModal.ERRO);
  }

  abrirLoading() {
    this.loaderService.showLoader();
    setTimeout(() => this.loaderService.hideLoader(), 5000);
  }

  mostrarNotificacao() {
    this.notificationService.success('Notificação de sucesso', 'Título da notificação');
    this.notificationService.error('Notificação de erro', 'Título da notificação');
    this.notificationService.warning('Notificação de alerta', 'Título da notificação');
    this.notificationService.info('Notificação de informação', 'Título da notificação');
  }

  atualizarValidatorsForm() {

    const validator = new AppValidator();

    // CPF/CNPJ
    this.formGroup.get('cpfCnpj')?.valueChanges.subscribe((value) => {
      this.mascaraCpfCnpj = value.length > 11 ? '00.000.000/0000-00' : '000.000.000-00';
      this.formGroup.get('cpfCnpj')?.setValidators(value.length > 11 ? cnpjValidator : cpfValidator);
      if (!validator.isValidCpfCnpj(value)) { this.formGroup.get('cpfCnpj')?.setErrors({ 'formatoInvalido': true }); };
    });

    // Telefone
    this.formGroup.get('telefone')?.valueChanges.subscribe((value) => {
      if (!validator.isValidTelefone(value)) { this.formGroup.get('telefone')?.setErrors({ 'formatoInvalido': true }); };
    });

    // Data de Nascimento
    this.formGroup.get('dataNasc')?.valueChanges.subscribe((value) => {
      if (!validator.isValidDataNascimento(value)) { this.formGroup.get('dataNasc')?.setErrors({ 'formatoInvalido': true }); };
    });
  }

  enviar() {
    console.log(this.formGroup);
  }
}
