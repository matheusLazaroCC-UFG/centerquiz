export class AppConstants {
	public static get baseServidor():string {
		return "https://centerquiz-production.up.railway.app/"
	}
	
	public static get baseLogin(): string {
		return this.baseServidor + "centerquiz/login/adm"
	}
	
	public static get baseUrl(): string {
		return this.baseServidor + ""
	}
	
	public static get baseApi(): string {
		return this.baseServidor + "centerquiz/"
	}
}