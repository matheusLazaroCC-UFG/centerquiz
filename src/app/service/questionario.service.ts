import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
	providedIn: 'root'
})
export class QuestionarioService {

	constructor(private http: HttpClient) {

	}

	getListQuestionarios(): Observable<any> {
		return this.http.get<any>(AppConstants.baseApi + "api/questionario/todos");
	}

	getBancoDeQuestoesQuestionarioIdQuestionario(id: Number): Observable<any> {
		return this.http.get<any>(
			AppConstants.baseApi + "api/adm/banco-de-questoes/obter-banco-id-questionario/id/" + id
		);
	}
	
	getQuestionarioId(id: Number): Observable<any> {
		return this.http.get<any>(
			AppConstants.baseApi + "api/questionario/id/" + id
		);
	}
}
