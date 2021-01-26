import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../models/autor.model';
import { Evidencija } from '../models/evidencija.model';
import { Kurs } from '../models/kurs.model';
import { AutorService } from '../services/autor.service';
import { CoursesService } from '../services/courses.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public kursevi: Kurs[] = [];
  public autori: Autor[] = [];
  public evidencije: Evidencija[] = [];

  constructor(private coursesService: CoursesService, private autorService: AutorService, private recordService: RecordService) {
    this.coursesService.getKursevi().subscribe((kursevi: Kurs[]) => {
      this.kursevi = kursevi;
    });
  }

  public getAuthor(authorId: number) {
    this.autorService.getAuthor(authorId).subscribe((autor: Autor) => {
      this.autori.push(autor);
    })
  }

  public getNumberOfStudents(courseId: number) {
    this.recordService.getRecordsByCourseId(courseId).subscribe((evidencije: Evidencija[]) => {
      this.evidencije = evidencije;
    });
  }

  ngOnInit(): void {
  }

}
