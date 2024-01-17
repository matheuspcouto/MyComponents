import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class SiteAtivoGuard {

  constructor(private router: Router) { };

  siteAtivo = true;
  
  canActivate() {
    if (!this.siteAtivo) {
      this.router.navigate([Rotas.AGUARDE]);
      return false;
    }
    return true;
  }

}
