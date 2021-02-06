import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/autor.model';
import { Kategorija } from '../models/kategorija.model';
import { Kurs } from '../models/kurs.model';
import { Student } from '../models/student.model';
import { AutorService } from '../services/autor.service';
import { CategoriesService } from '../services/categories.service';
import { CoursesService } from '../services/courses.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public kategorije: Kategorija[] = [];
  public studenti: Student[] = [];
  public brojKurseva: number;
  public kursevi: Kurs[] = [];
  public autori: Autor[] = [];

  constructor(
    private categoryService: CategoriesService,
    private studentService: StudentService,
    private courseService: CoursesService,
    private autorService: AutorService
  ) {
    this.categoryService.getCategories().subscribe((kategorije: Kategorija[]) => {
      this.kategorije = kategorije;
    });

    this.studentService.getStudents().subscribe((studenti: Student[]) => {
      this.studenti = studenti;
    });

    this.courseService.getKursevi().subscribe((kursevi: Kurs[]) => {
      this.brojKurseva = kursevi.length;
      if (kursevi.length > 6) {
        this.kursevi = kursevi.slice(0, 6);
      } else {
        this.kursevi = kursevi;
      }
    });

    this.autorService.getAuthors().subscribe((autori: Autor[]) => {
      if (autori.length > 3) {
        this.autori = autori.slice(0, 3);
      } else {
        this.autori = autori;
      }
    });
  }

  ngOnInit(): void {}
}
