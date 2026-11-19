import { Component, inject } from '@angular/core';
import { AcaoService } from '../../services/acao.service';

@Component({
  selector: 'app-impacto',
  templateUrl: './impacto.html',
  styleUrl: './impacto.css',
})
export class Impacto {
  service = inject(AcaoService);

  dicas = [
    'Um banho de 5 minutos gasta bem menos água que um de 15.',
    'Torneira pingando pode desperdiçar dezenas de litros por dia.',
    'Reaproveite a água da chuva para lavar quintais.',
    'Lave carros com balde em vez de mangueira.',
    'Junte roupa suja e use a máquina com carga cheia.',
    'Verifique vazamentos no vaso sanitário.',
    'Regue plantas de manhã cedo ou à noite.',
  ];

  // Pego o dia do mês atual com new Date().getDate() e aplico o resto da divisão (%) pelo tamanho do array de dicas; isso garante um índice válido de 0 até o fim da lista, fazendo a dica ir avançando e voltando ao início conforme os dias passam.
  dicaDoDia = this.dicas[new Date().getDate() % this.dicas.length];
}