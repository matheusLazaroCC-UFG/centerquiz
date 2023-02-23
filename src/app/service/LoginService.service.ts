import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';

@Injectable({
	providedIn: 'root'
})
export class LoginServiceService {
	constructor(private http: HttpClient, private router: Router) {
		
	}
	
	login(usuario) {
		// console.info("User: " + JSON.stringify(usuario))
		return this.http.post(
			AppConstants.baseLogin,
			JSON.stringify(usuario)
		).subscribe(
			data => {
				/* Retorno HTTP */
				var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]
				
				localStorage.setItem("token", token)
				
				//console.log("Token: " + JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1])
				
				this.getTipoUsuario();
				
				this.getUsuario(usuario);
				
				
				this.router.navigate(['home'])
			},
			error => {
				alert("Erro ao fazer login!")	
			}
		);
	}
	
	getUsuario(usuario) {
		this.http.post(
			AppConstants.baseApi + "api/dados-usuario",
			usuario
		).subscribe(
			data => {
				localStorage.setItem("idUsuario", String(JSON.parse(JSON.stringify(data)).id))
				localStorage.setItem("nomeUsuario", String(JSON.parse(JSON.stringify(data)).nome))
				localStorage.setItem("emailUsuario", String(JSON.parse(JSON.stringify(data)).email))
				localStorage.setItem("tipoUsuario", String(JSON.parse(JSON.stringify(data)).tipoUsuario))
				localStorage.setItem("enderecoUsuario", String(JSON.parse(JSON.stringify(data)).endereco))
				localStorage.setItem("dataNascimentoUsuario", String(JSON.parse(JSON.stringify(data)).dataNascimento))

			},
			error => {
				alert("error")
				console.log(error)
			}
		);
	}
	
	getTipoUsuario() {
		this.http.get(
			AppConstants.baseApi + "api/verificar-tipo-usuario"
		).subscribe(
			data => {
				var tipoUsuario = JSON.parse(JSON.stringify(data)).tipoUsuario;

				if (String(tipoUsuario) == "ADM") {
					localStorage.setItem("isAdm", "Sim")
				} else {
					localStorage.setItem("isAdm", "Não")
				}

			},
			error => {
				localStorage.setItem("isAdm", "Erro")
				console.log(error)
			}
		);
	}
}