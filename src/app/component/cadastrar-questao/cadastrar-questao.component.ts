import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';

@Component({
	selector: 'app-cadastrar-questao',
	templateUrl: './cadastrar-questao.component.html',
	styleUrls: ['./cadastrar-questao.component.css']
})
export class CadastrarQuestaoComponent implements OnInit {

	idBancoDeQuestoes: number;
	questionarioForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private route: ActivatedRoute
	) {
		this.questionarioForm = this.formBuilder.group({
			titulo: ['', Validators.required],
			texto: ['', Validators.required],
			opcoes: this.formBuilder.array([
				this.criarOpcao()
			]),
			respostas: this.formBuilder.array([
				//new FormControl('', Validators.required)
				this.criarResposta()
			]),
			idBancoDeQuestoes: [null]
		});
	}

	ngOnInit(): void {
		this.idBancoDeQuestoes = +this.route.snapshot.paramMap.get('idBancoDeQuestoes');
		this.questionarioForm.patchValue({
			idBancoDeQuestoes: this.idBancoDeQuestoes
		});
	}

	criarOpcao(): FormGroup {
		return this.formBuilder.group({
			opcao: ['', Validators.required]
		});
	}

	criarResposta(): FormGroup {
		return this.formBuilder.group({
			resposta: ['', Validators.required]
		});
	}

	adicionarOpcao(): void {
		const opcoes = this.questionarioForm.get('opcoes') as FormArray;
		opcoes.push(this.criarOpcao());
	}

	removerOpcao(index: number): void {
		const opcoes = this.questionarioForm.get('opcoes') as FormArray;
		opcoes.removeAt(index);
	}


	removerResposta(index: number): void {
		const respostas = this.questionarioForm.get('respostas') as FormArray;
		respostas.removeAt(index);
	}

	adicionarResposta(): void {
		const respostas = this.questionarioForm.get('respostas') as FormArray;
		//respostas.push(new FormControl('', Validators.required));
		respostas.push(this.criarResposta());
	}

	adicionarQuestao(): void {
		const questao = this.questionarioForm.getRawValue();
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		const body = {
			titulo: questao.titulo,
			texto: questao.texto,
			opcoes: questao.opcoes.map((opcao) => opcao.opcao),
			respostas: questao.respostas.map((resposta) => resposta.resposta),
			idBancoDeQuestoes: questao.idBancoDeQuestoes,
		}


		this.http.post(
			AppConstants.baseApi + 'api/adm/questao',
			body,
			{
				headers: headers
			}
		).subscribe(
			data => {
				alert('Questão cadastrada com sucesso!');
				this.questionarioForm.reset();
				(this.questionarioForm.get('opcoes') as FormArray).clear();
				(this.questionarioForm.get('opcoes') as FormArray).push(this.criarOpcao());
				(this.questionarioForm.get('respostas') as FormArray).clear();
				(this.questionarioForm.get('respostas') as FormArray).push(new FormControl('', Validators.required));
			},
			error => {
				console.log('Erro ao cadastrar questão!', error);
				alert('Erro ao cadastrar questão! Tente novamente mais tarde.');
			}
		);
	}

}