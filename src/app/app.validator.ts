import { Validators } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

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

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const emailValidator = [
  Validators.required,
  Validators.nullValidator,
  Validators.email,
  Validators.pattern(regexEmail)
];


const regexCnpj = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
export const cnpjValidator = [
  Validators.minLength(14),
  Validators.required,
  Validators.nullValidator,
  Validators.pattern(regexCnpj)
];

const regexCpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
export const cpfValidator = [
  Validators.minLength(11),
  Validators.required,
  Validators.nullValidator,
  Validators.pattern(regexCpf)
];

const regexTelefone = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
export const telefoneValidator = [
  Validators.minLength(11),
  Validators.required,
  Validators.nullValidator,
  Validators.pattern(regexTelefone)
];

export const senhaValidator = [
  Validators.maxLength(20),
  Validators.minLength(5),
  Validators.required,
  Validators.nullValidator,
];

export const mensagensErros = new Map<string, string>([
  ['required', 'é obrigatório'],
  ['min', 'deve ser no mínimo 1'],
  ['minlength', 'informado é muito curto'],
  ['maxlength', 'informado é muito longo'],
  ['pattern', 'informado não é válido'],
]);

export const nomesCampos = new Map<string, string>([
  ['nome', 'Nome'],
  ['sobrenome', 'Sobrenome'],
  ['idade', 'Idade'],
  ['telefone', 'Telefone'],
  ['cpfCnpj', 'CPF/CNPJ'],
  ['email', 'E-mail'],
  ['senha', 'Senha'],
  ['tipoMembroSelecionado', 'Tipo de Membro'],
  ['batizado', 'Batizado'],
]);

export function getValidationErrors(form: any): Erro[] {
  let errors: Erro[] = [];

  if (form.controls?.cpfCnpj && form.controls?.cpfCnpj.value) {
    if (!isValidCpfCnpj(form.controls.cpfCnpj.value)) { form.controls?.cpfCnpj.setErrors({ 'pattern': true }); };
  }

  if (form.controls?.telefone && form.controls?.telefone.value) {
    if (!isValidTelefone(form.controls.telefone.value)) { form.controls?.telefone.setErrors({ 'pattern': true }); };
  }

  if (form.controls?.dataNasc && form.controls?.dataNasc.value) {
    if (!isValidDataNascimento(form.controls.dataNasc.value)) { form.controls?.dataNasc.setErrors({ 'pattern': true }); };
  }

  Object.keys(form.controls).forEach((campoErro) => {
    const control = form.get(campoErro);

    var controlErrors: any = control?.errors;

    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((tipoErro) => {
        errors.push({
          controleErro: campoErro,
          tipoErro: tipoErro,
          mensagemErro: `O campo ${nomesCampos.get(campoErro)} ${mensagensErros.get(tipoErro)}. Por favor, tente novamente.`,
        });
      });
    }
  });

  return errors;
}

function isValidDataNascimento(dataNascimento: string) {
  const dataAtual = new Date();
  const dataNascimentoDate = new Date(dataNascimento);

  return dataNascimentoDate < dataAtual;
}

function isValidTelefone(telefone: string) {
  if (regexTelefone.test(telefone)) {
    let phoneUtil = PhoneNumberUtil.getInstance();
    let codigoPais = phoneUtil.getRegionCodeForCountryCode(parseInt("+55"));
    let numeroTelefone = phoneUtil.parse(telefone, codigoPais);

    return phoneUtil.isValidNumber(numeroTelefone);
  }

  return false;
}

function isValidCpfCnpj(cpfCnpj: string) {
  if (cpfCnpj === '' || !cpfCnpj) return false;

  cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');
  const regexDigitosIguais = /^(\d)\1+$/;

  if (regexDigitosIguais.test(cpfCnpj)) return false;

  if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) return false;

  if (cpfCnpj.length > 11) { // CNPJ
    let tamanho = cpfCnpj.length - 2;
    let numeros = cpfCnpj.substring(0, tamanho);
    const digitos = cpfCnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    ({ soma } = verificaSoma(tamanho, soma, numeros, pos));
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cpfCnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    ({ soma } = verificaSoma(tamanho, soma, numeros, pos));
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  }

  if (cpfCnpj.length === 11) { // CPF
    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpfCnpj.substring(0, 9);
    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpfCnpj !== cpfAux) {
      return false;
    } else {
      return true;
    }
  }

  return false;
}

function verificaSoma(tamanho: number, soma: number, numeros: string, pos: number) {
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos;
    pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  return { soma, pos };
}
