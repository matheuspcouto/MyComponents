import { ModalConfig } from './modal.directive';
import { Component } from '@angular/core';
import { ModalService } from './modal.service';

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

  constructor(private modalService: ModalService) { };

  fecharModal() { this.modalService.hide(); this.exibirModal = false; }

  abrirModal(modal: ModalConfig) {
    this.botao = modal.botao || this.fecharModal;

    if (modal.textoSegundoBotao && modal.segundoBotao) {
      this.segundoBotao = modal.segundoBotao;
    }

    this.modal = modal;
    this.modalService.show();
    this.exibirModal = true;
  };
}
