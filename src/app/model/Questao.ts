export class Questao {
	forEach(arg0: (questao: any) => void) {
		throw new Error('Method not implemented.');
	}
	id: number;
	titulo: string;
	texto: string;
	opcoes: string[];
	respostas: number[];
	vezesPerguntado: number;
	idBancoDeQuestoes: number;
}
