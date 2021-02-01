import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public emailExistDisplay: string = 'none';
  public student: Student;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public onRegister(form: NgForm) {
    if (form.valid) {
      this.studentService
        .getStudentByEmail(form.value.email)
        .subscribe((student: Student[]) => {
          if (student.length) {
            this.emailExistDisplay = 'block';
          } else {
            if (form.value.terms) {
              this.authService
                .createUser(
                  form.value.name,
                  form.value.email,
                  form.value.password
                );
            }
          }
        });
    }
  }
}