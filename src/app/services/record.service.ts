import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Evidencija } from '../models/evidencija.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private evidencije: Observable<Evidencija[]>;
  private readonly evindecijaUrl = 'http://localhost:3000/evidencije';

  constructor(private http: HttpClient) {
    this.refreshRecords();
  }

  public refreshRecords(): Observable<Evidencija[]> {
    this.evidencije = this.http.get<Evidencija[]>(this.evindecijaUrl);
    return this.evidencije;
  }

  public getRecordsByCourseId(courseId: number): Observable<Evidencija[]> {
    let params = new HttpParams().set('kursId', courseId.toString());
    return this.http.get<Evidencija[]>(this.evindecijaUrl, { params });
  }

  public getRecordsByStudentId(studentId: number): Observable<Evidencija[]> {
    let params = new HttpParams().set('korisnikId', studentId.toString());
    return this.http.get<Evidencija[]>(this.evindecijaUrl, { params });
  }

}
