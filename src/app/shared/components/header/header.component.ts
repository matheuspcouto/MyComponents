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
    { titulo: 'Item 1', rota: Rotas.HOME, icone: 'bi bi-person-fill', ativo: true, },
    { titulo: 'Item 2', rota: Rotas.HOME, icone: 'bi bi-people-fill',  ativo: true, },
    { titulo: 'Item 3', rota: Rotas.HOME, icone: 'bi bi-house-gear-fill', ativo: true, },
  ];

  showMenu = true;
  isClicado = false;

  constructor() {
    this.showMenu = new SiteAtivoGuard(new Router()).siteAtivo;
  }

}
