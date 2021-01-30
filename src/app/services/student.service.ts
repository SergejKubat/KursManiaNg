import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studenti: Observable<Student[]>;
  private readonly studentiUrl = 'http://localhost:3000/korisnici';

  constructor(private http: HttpClient) {
    this.refreshStudents();
  }

  public refreshStudents(): Observable<Student[]> {
    this.studenti = this.http.get<Student[]>(this.studentiUrl);
    return this.studenti;
  }

  public getStudents(): Observable<Student[]> {
    return this.studenti;
  }

  public getStudent(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentiUrl}/${studentId}`);
  }

  public getStudentByEmail(email: string): Observable<Student[]> {
    let params = new HttpParams().set('email', email);
    return this.http.get<Student[]>(this.studentiUrl, { params });
  }
}
