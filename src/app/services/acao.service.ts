import { Injectable, signal, computed } from '@angular/core';

export interface Acao {
  id: number;
  nome: string;
  litros: number;
  concluida: boolean;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class AcaoService {
  // Esta é a lista reativa de ações de economia de água do app. Ela é um signal para que o Angular acompanhe automaticamente qualquer alteração e atualize a interface e os cálculos derivados sem controle manual.
  acoes = signal<Acao[]>([]);

  metaSemanalLitros = 300;
  private chave = 'gota-certa-acoes';

  // O total é calculado lendo a lista atual de ações, filtrando apenas as concluídas (a.concluida) e somando os litros de cada uma com reduce. Como é um computed, ele se recalcula sozinho sempre que a lista muda.
  totalEconomizado = computed(() =>
    this.acoes()
      .filter(a => a.concluida)
      .reduce((soma, a) => soma + a.litros, 0)
  );

  progressoMeta = computed(() =>
    Math.min(100, (this.totalEconomizado() / this.metaSemanalLitros) * 100)
  );

  garrafas = computed(() => Math.floor(this.totalEconomizado() / 2));

  constructor() {
    // carregar() é chamado aqui porque o constructor executa assim que o serviço é inicializado, garantindo que os dados salvos anteriormente já sejam recuperados logo na abertura.
    this.carregar();
  }

  adicionar(nome: string, litros: number) {
    const nova: Acao = {
      id: Date.now(),
      nome,
      litros,
      concluida: false,
      data: new Date().toISOString(),
    };
    this.acoes.update(lista => [...lista, nova]);
    this.salvar();
  }

  alternar(id: number) {
    this.acoes.update(lista =>
      lista.map(a => (a.id === id ? { ...a, concluida: !a.concluida } : a))
    );
    this.salvar();
  }

  remover(id: number) {
    this.acoes.update(lista => lista.filter(a => a.id !== id));
    this.salvar();
  }


  private salvar() {
    // Uso JSON.stringify porque o localStorage só armazena strings, então preciso converter o array de objetos em texto JSON.
    // salvar() é chamado sempre que a lista sofre alteração: ao adicionar, alternar (concluir/desmarcar) ou remover uma ação.
    localStorage.setItem(this.chave, JSON.stringify(this.acoes()));
  }

  private carregar() {
    // Quando o app abre, busco os dados pela chave no localStorage, converto de volta para array com JSON.parse e preencho o signal acoes (se o dado estiver corrompido, o catch define uma lista vazia).
    // Se não houver nada salvo, getItem retorna null, o if não é executado e o signal acoes mantém seu valor inicial padrão ([]).
    const dados = localStorage.getItem(this.chave);
    if (dados) {
      try {
        this.acoes.set(JSON.parse(dados));
      } catch {
        this.acoes.set([]);
      }
    }
  }
}