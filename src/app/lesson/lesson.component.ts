import { Component, Input, OnInit } from '@angular/core';
import { Lekcija } from '../models/lekcija.model';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  @Input() lekcija: Lekcija;

  constructor() { }

  ngOnInit(): void {
  }

  public toHHMMSS(): string {
    let sec_num = parseInt(this.lekcija.LEKCIJA_DUZINA_TRAJANJA.toString(), 10);
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor(sec_num / 60) % 60
    let seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":");
  }

}
