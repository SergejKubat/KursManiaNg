import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/autor.model';
import { Kurs } from '../models/kurs.model';
import { Student } from '../models/student.model';
import { AutorService } from '../services/autor.service';
import { CoursesService } from '../services/courses.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public studenti: Student[] = [];
  public kursevi: Kurs[] = [];
  public autori: Autor[] = [];

  constructor(private studentService: StudentService, private courseService: CoursesService, private autorService: AutorService) {
    this.studentService.getStudents().subscribe((studenti: Student[]) => {
      this.studenti = studenti;
    });

    this.courseService.getKursevi().subscribe((kursevi: Kurs[]) => {
      this.kursevi = kursevi;
    });

    this.autorService.getAuthors().subscribe((autori: Autor[]) => {
      this.autori = autori;
    });
  }

  ngOnInit(): void {
  }

}
