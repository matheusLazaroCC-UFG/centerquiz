import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';

@Component({
	selector: 'app-cadastrar-questionario',
	templateUrl: './cadastrar-questionario.component.html',
	styleUrls: ['./cadastrar-questionario.component.css']
})
export class CadastrarQuestionarioComponent implements OnInit {
	questionarioForm: FormGroup;

	constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

	ngOnInit(): void {
		this.questionarioForm = this.formBuilder.group({
			nome: ['', Validators.required],
			dataInicio: ['', Validators.required],
			dataFim: ['', Validators.required],
			bancoDeQuestoes: this.formBuilder.array([])
		});
	}

	get bancoDeQuestoes(): FormArray {
		return this.questionarioForm.get('bancoDeQuestoes') as FormArray;
	}

	addQuestao() {
		const questao = this.formBuilder.group({
			titulo: ['', Validators.required],
			texto: ['', Validators.required],
			opcoes: this.formBuilder.array([this.criarOpcao()]),
			respostas: this.formBuilder.array([this.criarResposta()])
		});

		this.bancoDeQuestoes.push(questao);
	}

	criarOpcao(): FormGroup {
		return this.formBuilder.group({
			opcao: ['', Validators.required]
		});
	}

	criarResposta(): FormGroup {
		return this.formBuilder.group({
			indice: ['', Validators.required]
		});
	}

	removeQuestao(index: number) {
		this.bancoDeQuestoes.removeAt(index);
	}

	addOpcao(i: number) {
		const opcoes = this.bancoDeQuestoes.controls[i].get('opcoes') as FormArray;
		opcoes.push(this.criarOpcao());
	}

	removeOpcao(i: number, j: number) {
		const opcoes = this.bancoDeQuestoes.controls[i].get('opcoes') as FormArray;
		opcoes.removeAt(j);
	}

	addResposta(i: number) {
		const respostas = this.bancoDeQuestoes.controls[i].get('respostas') as FormArray;
		respostas.push(this.criarResposta());
	}

	removeResposta(i: number, j: number) {
		const respostas = this.bancoDeQuestoes.controls[i].get('respostas') as FormArray;
		respostas.removeAt(j);
	}

	submitQuestionario() {
		console.log(JSON.stringify(this.questionarioForm.value));

		//Salvar questionário:

		var jsonAntigo = this.questionarioForm.value;

		const jsonNovo = {
			"questionario": {
				"nome": jsonAntigo.nome,
				"dataInicio": jsonAntigo.dataInicio,
				"dataFim": jsonAntigo.dataFim || null
			},
			"bancoDeQuestoes": {
				"questoes": jsonAntigo.bancoDeQuestoes.map((questao) => {
					return {
						"titulo": questao.titulo,
						"texto": questao.texto,
						"opcoes": questao.opcoes.map((opcao) => {
							return opcao.opcao;
						}),
						"respostas": questao.respostas.map((resposta) => {
							return resposta.indice;
						})
					};
				})
			}
		};

		console.log(JSON.stringify(jsonNovo));


		var body = jsonNovo;

		this.http.post(AppConstants.baseApi + 'api/adm/registro-questionario', body).subscribe((data) => {
			alert('Questionário cadastrado com sucesso!');
			this.router.navigate(['home'])
		}, (error) => {
			alert("Erro ao cadastrar questionário, verifique os logs");
			console.error('Erro ao cadastrar questionário!:', JSON.stringify(error));
		});

	}
}
