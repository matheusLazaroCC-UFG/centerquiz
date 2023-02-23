import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './service/app.service';
import { LoginServiceService } from './service/LoginService.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	title = 'Front-end-Angular-CenterQuiz';
	constructor(private router: Router, private appService: AppService) {

	}

	ngOnInit(): void {
		if (localStorage.getItem('token') == null) {
			this.router.navigate(['login'])
		}

	}

	public sair() {
		localStorage.clear();
		this.router.navigate(['login'])
	}

	public esconderMenu() {

		if (localStorage.getItem('token') == null) {
			return true;
		} else {
			return false;
		}
	}

	public isAdm() {

		if (localStorage.getItem("isAdm") == "Sim") {
			return true;
		} else {
			return false;
		}
	}
	
	public getNomeUsuario() {
		return localStorage.getItem("nomeUsuario");
	}

}
