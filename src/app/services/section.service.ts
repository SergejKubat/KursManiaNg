import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sekcija } from '../models/sekcija.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private sekcije: Observable<Sekcija[]>;
  private readonly sekcijeUrl: string = 'http://localhost:3000/sekcije';

  constructor(private http: HttpClient) {}

  public getSectionsByCourseId(courseId: number) {
    let params = new HttpParams().set('kursId', courseId.toString());
    this.sekcije = this.http.get<Sekcija[]>(this.sekcijeUrl, { params });
    return this.sekcije;
  }
}