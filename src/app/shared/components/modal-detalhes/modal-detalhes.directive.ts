import { Directive, InjectionToken, Input } from '@angular/core';

export interface ModalDetalhesConfig { registro: any,
  botao?: () => void}

export type ModalDetalhes = (config: ModalDetalhesConfig) => Promise<boolean>;

export const MODAL_DETALHES = new InjectionToken<ModalDetalhes>('ModalDetalhesConfig');

@Directive({ selector: '[appModalDetalhes]', exportAs: 'modalDetalhes' })
export class ModalDetalhesDirective {

  @Input('appModalDetalhes')
  config?: ModalDetalhesConfig;
}
