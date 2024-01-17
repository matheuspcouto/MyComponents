import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface ErroLogin {
  tipoErro: string;
  controleErro?: string;
  mensagemErro: string;
}

export const senhaValidator = [
  Validators.maxLength(20),
  Validators.minLength(5),
  Validators.required,
  Validators.nullValidator,
];

export const emailValidator = [
  Validators.required,
  Validators.nullValidator,
  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
];

export function getLoginValidationErrors(email: string, senha: string): any[] {
  let errors: ErroLogin[] = [];

  var form = new FormGroup({
      email: new FormControl(email, emailValidator),
      senha: new FormControl(senha, senhaValidator)
  });

  Object.keys(form.controls).forEach((campoErro) => {
    const control = form.get(campoErro);

    var controlErrors: any = control?.errors;

    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((tipoErro) => {
        errors.push({
          controleErro: campoErro,
          tipoErro: tipoErro,
          mensagemErro: 'O campo de ' + campoErro + mensagensErros.get(tipoErro),
        });
      });
    }
  });

  return errors;
}

export const mensagensErros = new Map<string, string>([
  ['required', ' é obrigatório'],
  ['min', ' deve ser no mínimo 1'],
  ['minlength', ' informado é muito curto'],
  ['maxlength', ' informado é muito longo'],
  ['pattern', ' informado é inválido. Insira um formato válido.'],
]);
