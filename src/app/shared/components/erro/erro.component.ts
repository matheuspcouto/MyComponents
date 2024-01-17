import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FluxoErro } from '../../models/erro';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  loading = false;
  error: any;

  constructor(
    private fluxoErro: FluxoErro,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.fluxoErro.getErro().subscribe((erro) => {
      this.error = erro;
      this.loading = false;
    });
  }

  voltar() {
    this.router.navigate([this.error.rotaBtnVoltar]);
    this.fluxoErro.limparErro();
  }

}
