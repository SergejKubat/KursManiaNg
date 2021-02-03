import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Kurs } from '../models/kurs.model';
import { Ocena } from '../models/ocena.model';
import { AuthService } from '../services/auth.service';
import { MarkService } from '../services/mark.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
})
export class CreateReviewComponent implements OnInit, OnDestroy {
  @Input() kurs: Kurs;
  @Output() newReviewEvent = new EventEmitter<Ocena>();

  public stars: any;

  public ocenaVrednost: number;

  public ocena: Ocena;

  public markErrorVisibility: boolean = false;

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  private studentId: number;

  constructor(
    private authService: AuthService,
    private markService: MarkService,
    private renderer: Renderer2,
    private root: ElementRef
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
  }

  ngAfterViewInit() {
    this.stars = this.root.nativeElement.querySelectorAll('.fa');
  }

  public setMarkValue(event: any) {
    this.ocenaVrednost = Number(event.target.dataset.value);
    this.stars.forEach((star, index) => {
      if (index + 1 <= this.ocenaVrednost) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  public onSubmit(form: NgForm) {
    if (!this.ocenaVrednost) {
      this.markErrorVisibility = true;
      return;
    }
    if (form.invalid) {
      return;
    }

    this.ocena = {
      OCENA_ID: null,
      KORISNIK_ID: this.studentId,
      KURS_ID: this.kurs.KURS_ID,
      OCENA_VREDNOST: this.ocenaVrednost,
      OCENA_KOMENTAR: form.value.comment,
    };

    this.markService.addMark(this.ocena).subscribe(result => {
      console.log(result);
      this.addNewMark(this.ocena);
      form.reset();
    });
  }

  public addNewMark(ocena: Ocena) {
    this.newReviewEvent.emit(ocena);
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
