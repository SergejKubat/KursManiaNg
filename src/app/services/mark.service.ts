import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocena } from '../models/ocena.model';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private ocene: Observable<Ocena[]>;
  private readonly oceneUrl: string = 'http://localhost:3000/ocene';

  constructor(private http: HttpClient) {
    this.refreshMarks();
  }

  public refreshMarks(): Observable<Ocena[]> {
    this.ocene = this.http.get<Ocena[]>(this.oceneUrl);
    return this.ocene;
  }

  public getMarks(): Observable<Ocena[]> {
    return this.ocene;
  }

  public getMarksByCourseId(courseId: number): Observable<Ocena[]> {
    let params = new HttpParams().set('kursId', courseId.toString());
    return this.http.get<Ocena[]>(this.oceneUrl, { params });
  }

  public getMarksByAuthorId(authorId: number): Observable<Ocena[]> {
    let params = new HttpParams().set('autorId', authorId.toString());
    return this.http.get<Ocena[]>(this.oceneUrl, { params });
  }
}