import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Kategorija } from '../models/kategorija.model';
import { Student } from '../models/student.model';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showMenu: boolean = false;
  public searchResultDisplay: boolean = false;

  public student: Student;

  public query: string;

  public kategorije: Kategorija[] = [];

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  private studentId: number;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private studentService: StudentService
  ) {
    this.categoriesService
      .getCategories()
      .subscribe((kategorije: Kategorija[]) => {
        this.kategorije = kategorije;
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
    if (this.studentId) {
      this.studentService
        .getStudent(this.studentId)
        .subscribe((student: Student) => {
          this.student = student;
        });
    }
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.router.navigate(['/kursevi'], { queryParams: { q: form.value.q } });
    this.showMenu = false;
  }

  public onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}