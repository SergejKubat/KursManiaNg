import { Component, Input, OnInit } from '@angular/core';
import { Kategorija } from '../models/kategorija.model';
import { Kurs } from '../models/kurs.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() kategorija: Kategorija;
  public brojKurseva: number = 0;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.getKurseviByCategoryId(this.kategorija.KATEGORIJA_ID).subscribe((kursevi: Kurs[]) => {
      this.brojKurseva += kursevi.length;
    })
  }

}
