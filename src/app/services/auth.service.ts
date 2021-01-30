import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public createUser(name: string, email: string, password: string) {
    const authData = { name: name, email: email, password: password };
    return this.http.post('http://localhost:3000/registracija', authData);
  }

  public logIn(email: string, password: string) {
    const authData = { email: email, password: password };
    return this.http.post('http://localhost:3000/prijava', authData);
  }
}
