import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) {

	}

	getListUsuarios(): Observable<any> {
		return this.http.get<any>(AppConstants.baseApi + "api/adm/usuarios");

	}
}
