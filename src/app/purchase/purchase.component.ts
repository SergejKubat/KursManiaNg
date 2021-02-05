import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Kurs } from '../models/kurs.model';
import { AuthService } from '../services/auth.service';
import { CoursesService } from '../services/courses.service';
import { RecordService } from '../services/record.service';
import { creditCardNumberValidator } from '../validators/credit-card-number.validator';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  private kursId: number;

  public kurs: Kurs;

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  private studentId: number;

  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private courseService: CoursesService,
    private recordService: RecordService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.kursId = Number(params['kursId']);

      this.isAuthentificated = this.authService.getIsAuth();
      this.studentId = this.authService.getStudentId();
      this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe((isAuth) => {
          this.isAuthentificated = isAuth;
          this.studentId = this.authService.getStudentId();
        });

      this.courseService.getKurs(this.kursId).subscribe((kurs: Kurs) => {
        this.kurs = kurs;
      });
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      brojKartice: new FormControl(null, { validators: [Validators.required, creditCardNumberValidator] }),
      datumIsteka: new FormControl(null, { validators: [Validators.required, Validators.pattern(('(0[1-9]|10|11|12)/20[0-9]{2}$'))] }),
      sigurnosniBroj: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[0-9]{3,4}$')] })
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this.recordService.addRecord({ KORISNIK_ID: this.studentId, KURS_ID: this.kursId }).subscribe(result => {
        console.log(result);
        this.router.navigate(['/kurs', this.kursId]);
      });
    } else {
      console.log('nije validna');
    }
  }
}
