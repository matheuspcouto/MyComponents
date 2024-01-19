import { Component } from '@angular/core';
import { getLoginValidationErrors } from './login.validator';
import { Router } from '@angular/router';
import { Rotas } from 'src/app/shared/enums/rotas-enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  errorsValidators: any = [];
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  entrar() {
    this.errorsValidators = getLoginValidationErrors(this.email, this.senha);

    if (this.errorsValidators.length == 0) {
      this.loading = true;

      this.authService.login(this.email, this.senha).subscribe({
        next: (res) => {
          if (res.data && res.data.token == 1) { sessionStorage.setItem('primeiroAcesso', 'true'); }
          sessionStorage.setItem('isLogado', 'true');
          this.router.navigate([Rotas.HOME]);
          this.loading = false;
        },
        error: () => {
          this.errorsValidators.push({ tipoErro: 'Usuário ou senha inválidos.', controleErro: 'login', mensagemErro: 'Usuário ou senha inválidos.' });
          this.loading = false;
        },
      });
    }
  }
}
