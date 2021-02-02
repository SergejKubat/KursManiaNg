import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ocena } from '../models/ocena.model';
import { Student } from '../models/student.model';
import { AuthService } from '../services/auth.service';
import { MarkService } from '../services/mark.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {

  @Input() ocena: Ocena;
  public student: Student;

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  public studentId: number;

  constructor(private studentService: StudentService, private authService: AuthService, private markService: MarkService) {}

  ngOnInit(): void {
    this.studentService.getStudent(this.ocena.KORISNIK_ID).subscribe((student: Student) => {
      this.student = student;
    });

    this.isAuthentificated = this.authService.getIsAuth();
    this.studentId = this.authService.getStudentId();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuthentificated = isAuth;
      this.studentId = this.authService.getStudentId();
    });
  }

  public deleteReview() {
    this.markService.removeMark(this.ocena).subscribe(response => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}
