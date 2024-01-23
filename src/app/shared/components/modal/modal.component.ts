import { ModalConfig } from './modal.directive';
import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { ToastrService } from 'ngx-toastr';

enum TamanhoModal {
  TELA_INTEIRA = 'tela-inteira',
  METADE_TELA = 'metade-tela'
}

export const TipoModal = {
  CONFIRMACAO: { tipo: 'confirmacao', tamanho: TamanhoModal.METADE_TELA },
  AVISO: { tipo: 'aviso', tamanho: TamanhoModal.TELA_INTEIRA },
  ERRO: { tipo: 'erro', tamanho: TamanhoModal.TELA_INTEIRA },
}
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  exibirModal: boolean = false;
  modal: any;
  botao: () => void = () => { };
  segundoBotao: () => void = () => { };
  btnCopiarMensagemErro: any;
  isCopiado: boolean = false;

  constructor(private modalService: ModalService, private notificationService: ToastrService) { };

  fecharModal() { this.modalService.hide(); this.exibirModal = false; this.isCopiado = false; }

  abrirModal(modal: ModalConfig, tipoModal: any) {
    modal.isTelaInteira = tipoModal.tamanho === TamanhoModal.TELA_INTEIRA;
    this.botao = modal.botao || this.fecharModal;
    this.btnCopiarMensagemErro = tipoModal === TipoModal.ERRO;

    if (modal.textoSegundoBotao && modal.segundoBotao) {
      this.segundoBotao = modal.segundoBotao;
    }

    this.modal = modal;
    this.modalService.show();
    this.exibirModal = true;
  };

  copiarCodigo(event: MouseEvent) {
    event.preventDefault();
    const payload: string = this.modal.texto;

    let listener = (e: ClipboardEvent) => {
      let clipboard = e.clipboardData || null;

      if (clipboard !== null) {
        clipboard.setData('text', payload.toString());
        e.preventDefault();
      }
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
    this.isCopiado = true;
    this.notificationService.info('Erro copiado', '');
  }
}
