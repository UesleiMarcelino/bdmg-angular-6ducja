import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private apiUrl: string = 'https://viacep.com.br/ws/30160907/json/';

  constructor(private http: HttpClient) {}

  getViaCep(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  public getBuscarCep(cep: any): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }
  
}
