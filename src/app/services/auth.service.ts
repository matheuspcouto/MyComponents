import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isLogado(): boolean {
    return sessionStorage.getItem('isLogado') === 'true';
  }

  login(email: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', 'email': email, 'senha': senha });

    return this.httpClient.get<any>(`${environment.baseUrl}/login`, { headers: headers });
  }
}
