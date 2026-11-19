import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AcaoService } from '../../services/acao.service';
import { ItemAcao } from '../../components/item-acao/item-acao';

@Component({
  selector: 'app-home',
  imports: [FormsModule, ItemAcao],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  service = inject(AcaoService);

  nome = '';
  litros: number | null = null;
  sugestaoEscolhida = '';


  sugestoes = [
    { nome: 'Reduzir o banho em 5 minutos', litros: 45 },
    { nome: 'Fechar a torneira ao escovar os dentes', litros: 10 },
    { nome: 'Fechar a torneira ao ensaboar a louça', litros: 30 },
    { nome: 'Reaproveitar água da máquina de lavar', litros: 50 },
    { nome: 'Varrer em vez de lavar a calçada', litros: 100 },
  ];

  preencherSugestao() {
    const s = this.sugestoes.find(x => x.nome === this.sugestaoEscolhida);
    if (s) {
      this.nome = s.nome;
      this.litros = s.litros;
    }
  }

  adicionar() {
    if (!this.nome.trim() || !this.litros || this.litros <= 0) return;
    this.service.adicionar(this.nome.trim(), this.litros);
    this.nome = '';
    this.litros = null;
    this.sugestaoEscolhida = '';
  }
}
