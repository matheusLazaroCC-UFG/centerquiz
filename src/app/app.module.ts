import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './component/usuario/usuario/usuario.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { CadastrarQuestionarioComponent } from './component/cadastrar-questionario/cadastrar-questionario.component';
import { QuestionarioComponent } from './component/questionario/questionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ConclusoesComponent } from './component/conclusoes/conclusoes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { CadastrarQuestaoComponent } from './component/cadastrar-questao/cadastrar-questao.component';
import { CadastrarUsuarioComponent } from './component/cadastrar-usuario/cadastrar-usuario.component';
import { AnaliseDadosComponent } from './component/analise-dados/analise-dados.component';
import Chart from 'chart.js/auto';


export const appRouters: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'usuarios',
		component: UsuarioComponent
	},
	{
		path: 'cadastrar-questionario',
		component: CadastrarQuestionarioComponent
	},
	{
		path: 'questionario',
		component: QuestionarioComponent
	},
	{
		path: 'cadastrar-questao',
		component: CadastrarQuestaoComponent
	},
	{
		path: 'cadastrar-usuario',
		component: CadastrarUsuarioComponent
	},
	{
		path: 'analise-dados',
		component: AnaliseDadosComponent
	}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters)

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		UsuarioComponent,
		CadastrarQuestionarioComponent,
		QuestionarioComponent,
		ConclusoesComponent,
		CadastrarQuestaoComponent,
		CadastrarUsuarioComponent,
  AnaliseDadosComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		routes,
		HttpInterceptorModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		BrowserAnimationsModule
	],
	providers: [DatePipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
