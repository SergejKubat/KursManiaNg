import { Component, OnInit } from '@angular/core';
import { Kurs } from '../models/kurs.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public kursevi: Kurs[] = [];

  constructor(private coursesService: CoursesService) {
    this.coursesService.getKursevi().subscribe((kursevi: Kurs[]) => {
      this.kursevi = kursevi;
    });
  }

  ngOnInit(): void {
  }

}
