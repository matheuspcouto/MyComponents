import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './shared/components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyComponents';
  loading = false;
  @ViewChild('modal', { static: true }) modal: ModalComponent | undefined;

  abrirModalMetadeTela() {
    const MODAL = {
      titulo: 'Modal de Metade de Tela',
      texto: 'Este é um modal de metade de tela. Você pode usar ele para confirmar uma ação.',
      textoBotao: 'OK',
      botao: () => console.log('Modal Aberto'),
      textoSegundoBotao: 'Fechar',
      segundoBotao: () => { console.log('Modal Fechado'); this.modal?.fecharModal(); },
      isTelaInteira: false
    }

    this.modal?.abrirModal(MODAL);
  }

  abrirModalTelaInteira() {
    const MODAL = {
      titulo: 'Modal de Tela Inteira',
      texto: 'Este é um modal de tela inteira. Você pode usar ele para exibir informações mais detalhadas.',
      textoBotao: 'OK',
      imagem: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==',
      botao: () => this.modal?.fecharModal(),
      isTelaInteira: true
    }

    this.modal?.abrirModal(MODAL);
  }

}
