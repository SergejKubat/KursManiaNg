import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Autor } from '../models/autor.model';
import { Evidencija } from '../models/evidencija.model';
import { Kategorija } from '../models/kategorija.model';
import { Kurs } from '../models/kurs.model';
import { AutorService } from '../services/autor.service';
import { CategoriesService } from '../services/categories.service';
import { CoursesService } from '../services/courses.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  public overviewVisibility: boolean = true;
  public contentVisibility: boolean = false;
  public authorVisibility: boolean = false;
  public reviewsVisibility: boolean = false;

  public kurs: Kurs;
  public autor: Autor;
  public kategorija: Kategorija;
  public evidencija: Evidencija[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private autorService: AutorService,
    private categoriesService: CategoriesService,
    private recordService: RecordService
  ) {
    this.route.paramMap.subscribe((params) => {
      const kursId = Number(params.get('kursId'));

      this.courseService.getKurs(kursId).subscribe((kurs: Kurs) => {
        this.kurs = kurs;

        this.autorService
          .getAuthor(this.kurs.KURS_ID)
          .subscribe((autor: Autor) => {
            this.autor = autor;
          });

        this.categoriesService
          .getCategory(this.kurs.KATEGORIJA_ID)
          .subscribe((kategorija: Kategorija) => {
            this.kategorija = kategorija;
          });

        this.recordService
          .getRecordsByCourseId(this.kurs.KURS_ID)
          .subscribe((evidencija: Evidencija[]) => {
            this.evidencija = evidencija;
          });
      });
    });
  }

  ngOnInit(): void {}

  public showTab(index: number): void {
    // RESET
    this.overviewVisibility = false;
    this.contentVisibility = false;
    this.authorVisibility = false;
    this.reviewsVisibility = false;

    switch (index) {
      case 1:
        this.overviewVisibility = true;
        break;
      case 2:
        this.contentVisibility = true;
        break;
      case 3:
        this.authorVisibility = true;
        break;
      case 4:
        this.reviewsVisibility = true;
        break;
    }
  }
}
