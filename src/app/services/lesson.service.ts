import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lekcija } from '../models/lekcija.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lekcije: Observable<Lekcija[]>;
  private readonly lekcijeUrl: string = 'http://localhost:3000/lekcije';

  constructor(private http: HttpClient) {}

  public getLessonsBySectionId(sectionId: number) {
    let params = new HttpParams().set('sekcijaId', sectionId.toString());
    this.lekcije = this.http.get<Lekcija[]>(this.lekcijeUrl, { params });
    return this.lekcije;
  }
}