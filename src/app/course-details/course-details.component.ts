import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Autor } from '../models/autor.model';
import { Evidencija } from '../models/evidencija.model';
import { Kategorija } from '../models/kategorija.model';
import { Kurs } from '../models/kurs.model';
import { Ocena } from '../models/ocena.model';
import { Sekcija } from '../models/sekcija.model';
import { AuthService } from '../services/auth.service';
import { AutorService } from '../services/autor.service';
import { CategoriesService } from '../services/categories.service';
import { CoursesService } from '../services/courses.service';
import { MarkService } from '../services/mark.service';
import { RecordService } from '../services/record.service';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  public overviewVisibility: boolean = true;
  public contentVisibility: boolean = false;
  public authorVisibility: boolean = false;
  public reviewsVisibility: boolean = false;

  public kurs: Kurs;
  public autor: Autor;
  public kategorija: Kategorija;
  public evidencija: Evidencija[] = [];
  public ocene: Ocena[] = [];
  public sekcije: Sekcija[] = [];
  public preporuceniKursevi: Kurs[] = [];

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  private studentId: number;

  public canAddNewMark: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private autorService: AutorService,
    private categoriesService: CategoriesService,
    private recordService: RecordService,
    private markService: MarkService,
    private sectionService: SectionService,
    private authService: AuthService
  ) {
    this.route.paramMap.subscribe((params) => {
      const kursId = Number(params.get('kursId'));

      this.courseService.getKurs(kursId).subscribe((kurs: Kurs) => {
        this.kurs = kurs;

        this.autorService
          .getAuthor(this.kurs.AUTOR_ID)
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

        this.markService
          .getMarksByCourseId(this.kurs.KURS_ID)
          .subscribe((ocene: Ocena[]) => {
            this.ocene = ocene;
          });

        this.sectionService
          .getSectionsByCourseId(this.kurs.KURS_ID)
          .subscribe((sekcije: Sekcija[]) => {
            this.sekcije = sekcije;
          });

        this.courseService
          .getKurseviByCategoryId(this.kurs.KATEGORIJA_ID)
          .subscribe((kursevi: Kurs[]) => {
            kursevi.forEach((k) => {
              if (k.KURS_ID !== this.kurs.KURS_ID) {
                this.preporuceniKursevi.push(k);
              }
            });
          });
      });
    });
  }

  ngOnInit(): void {
    this.isAuthentificated = this.authService.getIsAuth();
    this.studentId = this.authService.getStudentId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isAuthentificated = isAuth;
        this.studentId = this.authService.getStudentId();
      });
  }

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
        this.checkStudent();
        break;
    }
  }

  public checkStudent() {
    let kupljen = false;
    this.recordService
      .getRecordsByStudentId(this.studentId)
      .subscribe((evidencije: Evidencija[]) => {
        evidencije.forEach((evidencija) => {
          if (evidencija.KORISNIK_ID == this.studentId) {
            kupljen = true;

            if (kupljen) {
              this.markService
                .getMarksByAuthorId(this.studentId)
                .subscribe((ocene: Ocena[]) => {
                  ocene.forEach((ocena) => {
                    if (ocena.KORISNIK_ID == this.studentId) {
                      this.canAddNewMark = false;
                    }
                  });
                });
            } else {
              this.canAddNewMark = false;
            }
          }
        });
      });
  }

  public addOcena(ocena: Ocena) {
    this.ocene.push(ocena);
  }

  public countAverageMark() {
    if (!this.ocene.length) return 0;
    let sum = 0;
    let length = this.ocene.length;
    this.ocene.forEach((ocena) => {
      sum += ocena.OCENA_VREDNOST;
    });
    return Number((sum / length).toFixed(2));
  }

  public countPercOfSpecMark(mark: number) {
    if (mark <= 0 && mark > 5) return 0;
    if (!this.ocene.length) return 0;
    return Number(
      (this.ocene.filter((ocena) => ocena.OCENA_VREDNOST == mark).length /
        this.ocene.length) *
        100
    ).toFixed(2);
  }
}
