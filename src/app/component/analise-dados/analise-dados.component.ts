import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartType, ChartOptions } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-analise-dados',
	templateUrl: './analise-dados.component.html',
	styleUrls: ['./analise-dados.component.css']
})
export class AnaliseDadosComponent implements OnInit {
	dados: any[];
	acertos: number[];
	erros: number[];
	private endpoint = 'http://localhost:8080/centerquiz/api/obter-todas-conclusoes-usuario';
	@ViewChild('grafico', { static: true }) grafico: ElementRef<HTMLCanvasElement>;

	constructor(private http: HttpClient, private elRef: ElementRef) { }

	ngOnInit() {
		var usuarioLogado = localStorage.getItem("idUsuario");
		this.obterDados(Number(usuarioLogado)).subscribe(
			(dados: any[]) => {
				this.dados = dados;

				console.log("Dados: " + JSON.stringify(dados))
				this.processarDados();
				this.criarGrafico();
			},
			error => console.error(error)
		);
	}

	obterDados(idUsuario: number) {
		return this.http.post<any[]>(this.endpoint, { idUsuario });
	}

	processarDados() {
		const questoes: { [key: string]: { acertos: number; erros: number } } = this.dados.reduce((acc, cur) => {
			if (!acc[cur.idQuestao]) {
				acc[cur.idQuestao] = { acertos: 0, erros: 0 };
			}
			if (cur.acertou == 'SIM') {
				acc[cur.idQuestao].acertos++;
			} else {
				acc[cur.idQuestao].erros++;
			}
			return acc;
		}, {});
		this.acertos = Object.values(questoes).map(q => q.acertos);
		this.erros = Object.values(questoes).map(q => q.erros);
		const questoesConcluidas = Object.keys(questoes).map(k => parseInt(k)).sort();
		this.atualizarLabels(questoesConcluidas);
	}


	criarGrafico() {
		const ctx = this.grafico.nativeElement.getContext('2d');
		const options: ChartOptions<'bar'> = {
			scales: {
				x: {
					type: 'category',
					title: {
						display: true,
						text: 'ID da Questão'
					}
				},
				y: {
					beginAtZero: true,
					ticks: {
						precision: 0
					},
					title: {
						display: true,
						text: 'Quantidade de Acertos/Erros'
					}
				}
			}
		};

		new Chart(ctx, {
			type: 'bar' as ChartType,
			data: {
				labels: [],
				datasets: [
					{
						label: 'Acertos',
						data: this.acertos,
						backgroundColor: 'green'
					},
					{
						label: 'Erros',
						data: this.erros,
						backgroundColor: 'red'
					}
				]
			},
			options
		});
	}
	atualizarLabels(questoesConcluidas: number[]) {
  const labels = this.dados
    .filter(d => questoesConcluidas.includes(d.idQuestao))
    .map(d => d.idQuestao.toString());

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        type: 'category',
        labels: labels,
        title: {
          display: true,
          text: 'ID da Questão'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        },
        title: {
          display: true,
          text: 'Quantidade de Acertos/Erros'
        }
      }
    }
  };

  const ctx = this.grafico.nativeElement.getContext('2d');
  this.grafico = new Chart(ctx, {
    type: 'bar' as ChartType,
    data: {
      labels: ['Acertos', 'Erros'],
      datasets: [
        {
          label: 'Acertos',
          data: this.acertos,
          backgroundColor: 'green'
        },
        {
          label: 'Erros',
          data: this.erros,
          backgroundColor: 'red'
        }
      ]
    },
    options
  });
}


}
