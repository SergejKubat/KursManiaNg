import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kategorija } from '../models/kategorija.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private kategorije: Observable<Kategorija[]>;
  private readonly kategorijeUrl = 'http://localhost:3000/kategorije';

  constructor(private http: HttpClient) {
    this.refreshCategories();
  }

  public refreshCategories(): Observable<Kategorija[]> {
    this.kategorije = this.http.get<Kategorija[]>(this.kategorijeUrl);
    return this.kategorije;
  }

  public getCategories(): Observable<Kategorija[]> {
    return this.kategorije;
  }

  public getCategory(categoryId: number): Observable<Kategorija> {
    return this.http.get<Kategorija>(`${this.kategorijeUrl}/${categoryId}`);
  }
}
