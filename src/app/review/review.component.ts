import { Component, Input, OnInit } from '@angular/core';
import { Ocena } from '../models/ocena.model';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() ocena: Ocena;
  public student: Student;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudent(this.ocena.KORISNIK_ID).subscribe((student: Student) => {
      this.student = student;
    });
  }

}
