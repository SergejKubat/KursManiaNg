import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor } from '../models/autor.model';
import { Kurs } from '../models/kurs.model';
import { Rezultat } from '../models/rezultat.model';
import { AutorService } from '../services/autor.service';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchResultDisplay: boolean = false;
  public query: string;

  kursevi: Kurs[] = [];
  autori: Autor[] = [];

  public rezultati: Rezultat[] = [];
  public prikaz: Rezultat[] = [];

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.searchResultDisplay = false;
  }

  constructor(private router: Router, private coursesService: CoursesService, private autorService: AutorService) {

    this.coursesService.getKursevi().subscribe((kursevi: Kurs[]) => {
      this.kursevi = kursevi;
      this.kursevi.forEach(kurs => {
        this.rezultati.push({tip: 'Kurs', id: kurs.KURS_ID, ime: kurs.KURS_IME});
      });
    });

    this.autorService.getAuthors().subscribe((autori: Autor[]) => {
      this.autori = autori;
      this.autori.forEach(autor => {
        this.rezultati.push({tip: 'Autor', id: autor.AUTOR_ID, ime: autor.AUTOR_IME});
      });
    });

  }

  ngOnInit(): void {
  }

  public getResults(query: HTMLInputElement) {
    if (query.value) {
      this.searchResultDisplay = true;
    } else {
      this.searchResultDisplay = false;
    }

    this.prikaz = this.rezultati.filter(rezultat => rezultat.ime.toLocaleLowerCase().includes(query.value.toLocaleLowerCase())); 
  }

  public onSubmit() {
    this.router.navigate(['/kursevi'], { queryParams: { q: this.query } });
  }
}
