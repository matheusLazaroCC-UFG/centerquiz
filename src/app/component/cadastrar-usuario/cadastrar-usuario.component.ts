import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-cadastrar-usuario',
	templateUrl: './cadastrar-usuario.component.html',
	styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {
	usuario = {
		nome: '',
		email: '',
		senha: '',
		tipoUsuario: 0,
		dataNascimento: '',
		endereco: ''
	};

	emailInvalido = false;
	senhaInvalida = false;
	formularioInvalido = true;

	constructor(private http: HttpClient, private router: Router) { }

	cadastrarUsuario(form: NgForm) {
		if (!form.valid) {
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if (!emailRegex.test(this.usuario.email)) {
			this.emailInvalido = true;
			return;
		}

		if (this.usuario.senha.length < 8) {
			this.senhaInvalida = true;
			return;
		}
		
		console.log("Usuário: " + JSON.stringify(this.usuario));

		
		this.http.post('http://localhost:8080/centerquiz/api/adm/cadastrar-usuario', this.usuario)
			.subscribe(() => {
				alert("Usuário cadastrado com sucesso!")
				this.router.navigate(['/usuarios']);
			});
	}

	atualizaFormularioInvalido() {
		this.formularioInvalido = !this.usuario.nome || !this.usuario.email || !this.usuario.senha || !this.usuario.dataNascimento || !this.usuario.endereco;
	}
}
