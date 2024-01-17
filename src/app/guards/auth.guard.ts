import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../shared/enums/rotas-enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private authService: AuthService) { };

  canActivate() {
    if (!this.authService.isLogado()) {
      this.router.navigate([Rotas.LOGIN]);
      return false;
    }

    return true;
  }
}
