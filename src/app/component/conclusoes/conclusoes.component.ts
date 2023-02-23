import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/app-constants';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-conclusoes',
	templateUrl: './conclusoes.component.html',
	styleUrls: ['./conclusoes.component.css']
})
export class ConclusoesComponent implements OnInit {
	idQuestao: number;
	questoes: any[];
	respostas: any[];
	conclusoes: any = {};

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private http: HttpClient,
		private dialogRef: MatDialogRef<ConclusoesComponent>,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.idQuestao = this.data.idQuestao;
		this.questoes = this.data.questoes;
		this.respostas = this.data.respostas;
		this.obterConclusoes();


	}

	obterConclusoes() {
		const body = {
			"idUsuario": Number(localStorage.getItem("idUsuario")),
			"idQuestao": this.idQuestao
		};

		this.http.post(
			AppConstants.baseApi + 'api/conclusao-questao/obterConclusoesQuestaoUsuario', body
		).subscribe((data: any) => {

			this.conclusoes = data.map(conclusao => {
				return {
					"idConclusaoQuestao": conclusao.idConclusaoQuestao,
					"idUsuario": conclusao.idUsuario,
					"idQuestao": conclusao.idQuestao,
					"acertou": conclusao.acertou,
					"dataConclusao": this.datePipe.transform(conclusao.dataConclusao, 'dd/MM/yyyy HH:mm:ss')
				}
			});

			if (this.conclusoes.length === 0) {
				alert('Não há conclusões disponíveis para este questionário.');
			}
		});
	}

	fecharConclusoes() {
		this.dialogRef.close();
	}

}
