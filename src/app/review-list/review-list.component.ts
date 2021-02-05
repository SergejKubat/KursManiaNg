import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Evidencija } from '../models/evidencija.model';
import { Kurs } from '../models/kurs.model';
import { Ocena } from '../models/ocena.model';
import { AuthService } from '../services/auth.service';
import { MarkService } from '../services/mark.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit, OnDestroy {
  @Input() kurs: Kurs;

  public ocene: Ocena[] = [];

  private evidencije: Evidencija[];

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  private studentId: number;

  public canAddNewMark: boolean = true;

  constructor(
    private authService: AuthService,
    private markService: MarkService,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    this.isAuthentificated = this.authService.getIsAuth();
    this.studentId = this.authService.getStudentId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.isAuthentificated = isAuth;
        this.studentId = this.authService.getStudentId();
      });
    this.markService
      .getMarksByCourseId(this.kurs.KURS_ID)
      .subscribe((ocene: Ocena[]) => {
        this.ocene = ocene;
        if (this.isAuthentificated) {
          this.checkStudent();
        }
      });
  }

  public checkStudent() {
    const studentMarks = this.ocene.filter(mark => mark.KORISNIK_ID == this.studentId);
    this.recordService.getRecordsByStudentId(this.studentId).subscribe((evidencije: Evidencija[]) => {
      let isKupljen = false;
      if (evidencije.length) {
        evidencije.forEach(ev => {
          if (ev.KURS_ID == this.kurs.KURS_ID) {
            isKupljen = true;
          }
        });
        if (isKupljen) {
          if (studentMarks.length) {
            studentMarks.forEach(mark => {
              if (mark.KURS_ID == this.kurs.KURS_ID) {
                this.canAddNewMark = false;
                return;
              }
            });
          }
          else {
            this.canAddNewMark = true;
          }
        } else {
          this.canAddNewMark = false;
        }
      }
      else {
        this.canAddNewMark = false;
      }
    });
  }


  public addOcena(ocena: Ocena) {
    this.ocene.push(ocena);
    this.canAddNewMark = false;
  }

  public removeOcena(ocena: Ocena) {
    const index = this.ocene.indexOf(ocena);
    if (index > -1) {
      this.ocene.splice(index, 1);
      this.canAddNewMark = true;
    }
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
