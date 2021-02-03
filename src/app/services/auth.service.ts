import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private studentId: number;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthentificated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  public getToken(): string {
    return this.token;
  }

  public getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public getIsAuth(): boolean {
    return this.isAuthentificated;
  }

  public getStudentId() {
    return this.studentId;
  }

  public createUser(name: string, email: string, password: string): void {
    const authData = { name: name, email: email, password: password };
    this.http.post('http://localhost:3000/registracija', authData).subscribe(response => {
      console.log(response);
      this.router.navigate(['/prijava']);
    });
  }

  public logIn(email: string, password: string): void {
    const authData = { email: email, password: password };
    this.http.post<{token: string, expiresIn: number, studentId: number}>('http://localhost:3000/prijava', authData).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        this.isAuthentificated = true;
        this.studentId = response.studentId;

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.studentId);

        this.router.navigate(['/nalog']);
      }
    });
  }

  public autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthentificated = true;
      this.studentId = Number(authInformation.studentId);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  public logOut() {
    this.token = null;
    this.studentId = null;
    this.isAuthentificated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => { 
      this.logOut(); 
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, studentId: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('studentId', studentId.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('studentId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const studentId = localStorage.getItem('studentId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      studentId: studentId
    }
  }

}