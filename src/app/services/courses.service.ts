import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kurs } from '../models/kurs.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private kursevi: Observable<Kurs[]>;
  private readonly kurseviUrl = 'http://localhost:3000/kursevi';

  constructor(private http: HttpClient) {
    this.refreshKursevi();
  }

  public refreshKursevi(): Observable<Kurs[]> {
    this.kursevi = this.http.get<Kurs[]>(this.kurseviUrl);
    return this.kursevi;
  }

  public getKursevi(): Observable<Kurs[]> {
    return this.kursevi;
  }

  public getKurseviByCategoryId(kategorijaId: number): Observable<Kurs[]> {
    let params = new HttpParams().set('kategorijaId', kategorijaId.toString());
    return this.http.get<Kurs[]>(this.kurseviUrl, { params });
  }
}