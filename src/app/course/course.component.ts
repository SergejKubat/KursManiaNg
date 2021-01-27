import { Component, Input, OnInit } from '@angular/core';
import { Autor } from '../models/autor.model';
import { Evidencija } from '../models/evidencija.model';
import { Kurs } from '../models/kurs.model';
import { Ocena } from '../models/ocena.model';
import { AutorService } from '../services/autor.service';
import { MarkService } from '../services/mark.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() kurs: Kurs;
  public autor: Autor;
  public evidencija: Evidencija[] = [];
  public ocene: Ocena[] = [];

  constructor(
    private autorService: AutorService,
    private recordService: RecordService,
    private markService: MarkService
  ) {}

  ngOnInit(): void {

    this.autorService.getAuthor(this.kurs.AUTOR_ID).subscribe((autor: Autor) => {
      this.autor = autor;
    });

    this.recordService.getRecordsByCourseId(this.kurs.KURS_ID).subscribe((evidencija: Evidencija[]) => {
      this.evidencija = evidencija;
    });

    this.markService.getMarksByCourseId(this.kurs.KURS_ID).subscribe((ocene: Ocena[]) => {
      this.ocene = ocene;
    });
  }

  public countAverageMark(): number {
    if (!this.ocene.length) return 0;
    let sum = 0;
    let length = this.ocene.length;
    this.ocene.forEach((ocena) => {
      sum += ocena.OCENA_VREDNOST;
    });
    return sum / length;
  }
}
