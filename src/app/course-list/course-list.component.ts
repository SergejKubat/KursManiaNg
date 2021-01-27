import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kategorija } from '../models/kategorija.model';
import { Kurs } from '../models/kurs.model';
import { CategoriesService } from '../services/categories.service';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  public kategorije: Kategorija[] = [];
  public kursevi: Kurs[] = [];
  public vidljivosti: boolean[] = [];

  public query: string;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private coursesService: CoursesService
  ) {


    this.categoriesService
      .getCategories()
      .subscribe((kategorije: Kategorija[]) => {
        this.kategorije = kategorije;

        this.vidljivosti.push(true);
        this.kategorije.forEach(kat => {
          this.vidljivosti.push(false);
        });
      });

    this.coursesService.getKursevi().subscribe((kursevi: Kurs[]) => {
      this.kursevi = kursevi;

      this.route.queryParams.subscribe(params => {
        this.query = params['q'];
        this.kursevi = this.kursevi.filter(kurs => kurs.KURS_IME.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()));
      });
    });
  }

  ngOnInit(): void {}

  public log(event) {
    let categoryId = event.target.dataset.categoryid;

    for (let i = 0; i < this.vidljivosti.length; i++) {
      this.vidljivosti[i] = false;
    }

    this.vidljivosti[categoryId] = true;

    if (categoryId == 0) {
      this.coursesService.getKursevi().subscribe((kursevi: Kurs[]) => {
        this.kursevi = kursevi;
      });
    }

    if (categoryId > 0 && categoryId < this.kategorije.length) {
      this.coursesService.getKurseviByCategoryId(categoryId).subscribe((kursevi: Kurs[]) => {
        this.kursevi = kursevi;
      });
    }

  }
}
