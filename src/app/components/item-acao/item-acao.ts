import { Component, input, output } from '@angular/core';
import { Acao } from '../../services/acao.service';

@Component({
  selector: 'app-item-acao',
  templateUrl: './item-acao.html',
  styleUrl: './item-acao.css',
})
export class ItemAcao {
  // TODO (dupla): explique o que o input() recebe e de quem
  acao = input.required<Acao>();

  // TODO (dupla): explique como o output() avisa o componente pai
  concluir = output<number>();
  remover = output<number>();
}
