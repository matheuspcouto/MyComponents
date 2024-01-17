import { Component } from '@angular/core';
import { ModalDetalhesService } from './modal-detalhes.service';

@Component({
  selector: 'modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.css']
})
export class ModalDetalhesComponent {
  exibirModal: boolean = false;
  registro: any;
  botao: () => void = () => {};

  constructor(private modalDetalhesService: ModalDetalhesService) {};

  fecharModal() { this.modalDetalhesService.hide(); this.exibirModal = false; }

  abrirModal(registro: any, botao: () => void) {
    this.registro = registro;
    this.botao = botao;
    this.modalDetalhesService.show();
    this.exibirModal = true;
  };
}
