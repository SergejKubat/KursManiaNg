import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { Evidencija } from '../models/evidencija.model';
import { Kurs } from '../models/kurs.model';
import { Ocena } from '../models/ocena.model';
import { Student } from '../models/student.model';
import { AuthService } from '../services/auth.service';
import { CoursesService } from '../services/courses.service';
import { MarkService } from '../services/mark.service';
import { RecordService } from '../services/record.service';
import { StudentService } from '../services/student.service';
import { mimeType } from '../validators/mime-type.validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public student: Student;
  public evidencija: Evidencija[] = [];
  public kursevi: Kurs[] = [];
  public ocene: Ocena[] = [];

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  private studentId: number;

  public form: FormGroup;

  public imagePreview: string;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private recordService: RecordService,
    private coursesService: CoursesService,
    private markService: MarkService
  ) {
    this.isAuthentificated = this.authService.getIsAuth();
    this.studentId = this.authService.getStudentId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isAuthentificated = isAuth;
        this.studentId = this.authService.getStudentId();
      });

    this.studentService
      .getStudent(this.studentId)
      .subscribe((student: Student) => {
        this.student = student;
      });

    this.recordService
      .getRecordsByStudentId(this.studentId)
      .subscribe((evidencija: Evidencija[]) => {
        this.evidencija = evidencija;
        this.evidencija.forEach((e) => {
          this.coursesService.getKurs(e.KURS_ID).subscribe((kurs: Kurs) => {
            this.kursevi.push(kurs);
          });
        });
      });

    this.markService
      .getMarksByAuthorId(this.studentId)
      .subscribe((ocene: Ocena[]) => {
        this.ocene = ocene;
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }

  public onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = (fileReader.result as string);
    }
    fileReader.readAsDataURL(file);
  }

  public onSubmit() {
    if (this.form.valid) {
      this.student.KORISNIK_AVATAR = this.imagePreview;
      this.studentService.updateStudent(this.form.value.image, this.student).subscribe(result => {
        console.log(result);
        this.imagePreview = '';
      });
    }
  }

  public removeOcena(ocena: Ocena) {
    const index = this.ocene.indexOf(ocena);
    if (index > -1) {
      this.ocene.splice(index, 1);
    }
  }
}
