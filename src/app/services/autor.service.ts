import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private autori: Observable<Autor[]>;
  private readonly autoriUrl = 'http://localhost:3000/autori';

  constructor(private http: HttpClient) {
    this.refreshAuthors();
  }

  public refreshAuthors(): Observable<Autor[]> {
    this.autori = this.http.get<Autor[]>(this.autoriUrl);
    return this.autori;
  }

  public getAuthors(): Observable<Autor[]> {
    return this.autori;
  }
}
