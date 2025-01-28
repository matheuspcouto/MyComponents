import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteAtivoGuard } from 'src/app/guards/site-ativo.guard';
import { Rotas } from '../../enums/rotas-enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  itensMenu: any = [
    { titulo: 'Aba 1 (Home)', rota: Rotas.HOME, icone: 'bi bi-house-fill', ativo: true, focado: true },
    { titulo: 'Aba 2', rota: Rotas.HOME, icone: 'bi bi-person-fill', ativo: true, focado: false },
    { titulo: 'Aba 3', rota: Rotas.HOME, icone: 'bi bi-people-fill', ativo: true, focado: false },
    { titulo: 'Aba 4', rota: Rotas.HOME, icone: 'bi bi-calendar-week-fill', ativo: true, focado: false },
  ];
  showMenu = true;
  isClicado = false;
  anoAtual = new Date().getFullYear();

  constructor() {
    this.showMenu = new SiteAtivoGuard(new Router()).siteAtivo;
  }

  // Função para alternar o estado de 'focado' do item clicado
  setAbaAtiva(index: number): void {
    // Resetar 'focado' em todos os itens
    this.itensMenu.forEach((item: any) => {
      item.focado = false;
    });

    // Ativar o item clicado
    this.itensMenu[index].focado = true;
  }

}
