import { Component, OnInit } from '@angular/core';
import { Kategorija } from '../models/kategorija.model';
import { Kurs } from '../models/kurs.model';
import { CategoriesService } from '../services/categories.service';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public kategorije: Kategorija[] = [];

  constructor(private categoriesService: CategoriesService, private coursesService: CoursesService) {
    this.categoriesService.getCategories().subscribe((kategorije: Kategorija[]) => {
      this.kategorije = kategorije;
    });
  }

  ngOnInit(): void {
  }

  public getCoursesByCategoryId(kategorijaId: number) {
    this.coursesService.getKurseviByCategoryId(kategorijaId).subscribe((kursevi: Kurs[]) => {
      
    });
  }

}
