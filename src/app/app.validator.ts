import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Erro {
  tipoErro: string;
  controleErro?: string;
  mensagemErro: string;
}

export const nomeValidator = [
  Validators.maxLength(30),
  Validators.minLength(5),
  Validators.required,
  Validators.nullValidator,
];

export const idadeValidator = [
  Validators.min(1),
  Validators.required,
  Validators.nullValidator,
];

export const emailValidator = [
  Validators.required,
  Validators.nullValidator,
  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
];

export const cnpjValidator = [
  Validators.maxLength(14),
  Validators.minLength(14),
  Validators.required,
  Validators.nullValidator,
];

export const cpfValidator = [
  Validators.maxLength(11),
  Validators.minLength(11),
  Validators.required,
  Validators.nullValidator,
];

export const senhaValidator = [
  Validators.maxLength(20),
  Validators.minLength(5),
  Validators.required,
  Validators.nullValidator,
];

export const mensagensErros = new Map<string, string>([
  ['required', ' é obrigatório'],
  ['min', ' deve ser no mínimo 1'],
  ['minlength', ' informado é muito curto'],
  ['maxlength', ' informado é muito longo'],
  ['pattern', ' informado é inválido. Insira um formato válido.'],
]);


export function getValidationErrors(form: any): Erro[] {
  let errors: Erro[] = [];

  form = new FormGroup({
    nome: new FormControl(form.nome, nomeValidator),
    sobrenome: new FormControl(form.sobrenome, nomeValidator),
    idade: new FormControl(form.idade, idadeValidator),
    telefone: new FormControl(form.telefone, validaTelefone(form.telefone)),
    cpfCnpj: new FormControl(form.documento, validaCpfCnpj(form.cpfCnpj)),
    email: new FormControl(form.email, emailValidator),
    senha: new FormControl(form.senha, senhaValidator),
  });

  Object.keys(form.controls).forEach((campoErro) => {
    const control = form.get(campoErro);

    var controlErrors: any = control?.errors;

    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((tipoErro) => {
        errors.push({
          controleErro: campoErro,
          tipoErro: tipoErro,
          mensagemErro: campoErro + mensagensErros.get(tipoErro),
        });
      });
    }
  });

  return errors;
}

function validaTelefone(telefone: string): Validators {
  const regex = new RegExp('^[0-9]{10,11}$');
  return regex.test(telefone);
}

function validaCpfCnpj(doc: string): Validators {
  const regex = new RegExp('^[0-9]{11}$');
  return regex.test(doc);
}
