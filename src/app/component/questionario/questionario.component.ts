
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/app-constants';
import { MatDialog } from '@angular/material/dialog';
import { ConclusoesComponent } from '../conclusoes/conclusoes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
	selector: 'app-questionario',
	templateUrl: './questionario.component.html',
	styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {
	questionario: any = { questoes: [] };
	respostas: any = {};
	enviandoRespostas = false;

	constructor(private http: HttpClient, public dialog: MatDialog) { }

	ngOnInit(): void {
		let id = localStorage.getItem('idQuestionario');

		this.http.get(
			AppConstants.baseApi + 'api/adm/banco-de-questoes/obter-banco-id-questionario/id/' + id
		).subscribe((data: any) => {
			this.questionario = data;

			this.questionario.questoes.forEach((questao: any) => {
				questao.opcoes = questao.opcoes.map((opcao: any, index: any) => {
					return {
						valor: opcao,
						selecionada: false,
						indiceOpcao: index
					}
				});
			});
		});
	}

	selecionarOpcao(idQuestao: number, opcao: any, indiceOpcao: any) {
		opcao.selecionada = !opcao.selecionada;
		console.log("Selecionada a opção " + opcao.valor + " - da pergunta " + idQuestao);
	}

	enviarRespostas() {
		var respostasSelecionadas = this.questionario.questoes.map((questao: any) => {
			var opcoesSelecionadas = questao.opcoes
				.filter((opcao: any) => opcao.selecionada)
				.map((opcao: any) => opcao.valor)
				.join(', ');

			var indicesOpcoesSelecionadas = questao.opcoes
				.filter((opcao: any) => opcao.selecionada)
				.map((opcao: any) => opcao.indiceOpcao);

			return {
				questao: questao.titulo,
				resposta: opcoesSelecionadas,
				idQuestao: questao.id,
				indicesOpcoesSelecionadas: indicesOpcoesSelecionadas
			}
		});

		for (let i = 0; i < respostasSelecionadas.length; i++) {
			console.log("idQuestao: " + respostasSelecionadas[i].idQuestao + " respostas: " + respostasSelecionadas[i].indicesOpcoesSelecionadas);

			var body = {
				idQuestao: respostasSelecionadas[i].idQuestao,
				respostas: respostasSelecionadas[i].indicesOpcoesSelecionadas
			};

			this.http.post(AppConstants.baseApi + 'api/usuario-comum/responder-questionario', body).subscribe((data) => {
				console.log('Questionário enviado com sucesso!', data);
				if (data["sucesso"]) {
					this.respostas[respostasSelecionadas[i].idQuestao] = { feedback: 'sucesso' };
				} else {
					this.respostas[respostasSelecionadas[i].idQuestao] = { feedback: 'erro' };
				}
			}, error => {
				console.log('Erro ao enviar questionário', error);
				this.respostas[respostasSelecionadas[i].idQuestao] = { feedback: 'erro' };
				alert(`Houve um erro ao enviar a resposta da questão ${respostasSelecionadas[i].idQuestao}. Por favor, tente novamente mais tarde.`);
			});
		}
		this.enviandoRespostas = true;
	}

	abrirConclusoes(idQuestao: number, indiceQuestao: number) {
		const dialogRef = this.dialog.open(ConclusoesComponent, {
			width: '300px',
			data: {
				idQuestao: idQuestao,
				questoes: this.questionario.questoes,
				respostas: this.respostas
			},
			panelClass: 'custom-dialog-container'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result !== undefined) {
				console.log(result);
				this.respostas[idQuestao] = result;
				this.questionario.questoes[indiceQuestao].respondida = true;
			}
		});
	}

}