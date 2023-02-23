import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
	usuarios: Observable<Usuario[]>;

	constructor(private usuarioService: UsuarioService) {
	}

	ngOnInit() {


		this.usuarioService.getListUsuarios().subscribe(
			data => {
				this.usuarios = data;
			}
		);
	}

}
