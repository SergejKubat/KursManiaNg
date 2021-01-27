import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Autor } from '../models/autor.model';
import { Evidencija } from '../models/evidencija.model';
import { Kurs } from '../models/kurs.model';
import { Ocena } from '../models/ocena.model';
import { AutorService } from '../services/autor.service';
import { CoursesService } from '../services/courses.service';
import { MarkService } from '../services/mark.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  public autor: Autor;
  public kursevi: Kurs[] = [];
  public brojStudenata: number = 0;
  public brojOcena: number = 0;

  constructor(
    private route: ActivatedRoute,
    private autorService: AutorService,
    private coursesService: CoursesService,
    private recordService: RecordService,
    private markService: MarkService
  ) {
    this.route.paramMap.subscribe((params) => {
      const autorId = Number(params.get('autorId'));

      this.autorService.getAuthor(autorId).subscribe((autor: Autor) => {
        this.autor = autor;

        this.coursesService.getKurseviByAuthorId(this.autor.AUTOR_ID).subscribe((kursevi: Kurs[]) => {
          this.kursevi = kursevi;
          
          this.kursevi.forEach(kurs => {

            this.recordService.getRecordsByCourseId(kurs.KURS_ID).subscribe((evidencija: Evidencija[]) => {
              this.brojStudenata += evidencija.length;
            });

            this.markService.getMarksByCourseId(kurs.KURS_ID).subscribe((ocene: Ocena[]) => {
              this.brojOcena += ocene.length;
            });

          });

        });

      });
    });
  }

  ngOnInit(): void {}
}
