import { Component, ViewChild } from '@angular/core';
import { ModalComponent, TipoModal } from './shared/components/modal/modal.component';
import { Router } from '@angular/router';
import { Rotas } from './shared/enums/rotas-enum';
import { FluxoErro } from './shared/fluxo-erro';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyComponents';
  loading = false;
  erro: any;
  @ViewChild('modal', { static: true }) modal: ModalComponent | undefined;

  constructor(private router: Router, private notificationService: ToastrService) { }

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

  abrirModalAviso() {
    const MODAL = {
      titulo: 'Modal de Aviso',
      texto: 'Este é um modal de aviso. Você pode usar ele para exibir informações mais detalhadas.',
      textoBotao: 'OK',
      imagem: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==',
      botao: () => this.modal?.fecharModal(),
    }

    this.modal?.abrirModal(MODAL, TipoModal.AVISO);
  }

  abrirModalErro() {
    this.erro = new FluxoErro().construirErro({}, Rotas.HOME);

    const MODAL = {
      titulo: this.erro.titulo,
      texto: this.erro.mensagem,
      textoBotao: 'OK',
      imagem: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==',
      botao: () => this.modal?.fecharModal(),
    }

    this.modal?.abrirModal(MODAL, TipoModal.ERRO);
  }

  abrirLoading() {
    this.loading = true;
    setTimeout(() => this.loading = false, 5000);
  }

  mostrarNotificacao() {
    this.notificationService.success('Notificação de sucesso', 'Título da notificação');
    this.notificationService.error('Notificação de erro', 'Título da notificação');
    this.notificationService.warning('Notificação de alerta', 'Título da notificação');
    this.notificationService.info('Notificação de informação', 'Título da notificação');
  }

  redirectLogin() {
    this.router.navigate([Rotas.LOGIN]);
  }

}
