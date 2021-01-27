import { Component, Input, OnInit } from '@angular/core';
import { Lekcija } from '../models/lekcija.model';
import { Sekcija } from '../models/sekcija.model';
import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() sekcija: Sekcija;
  @Input() checked: boolean;
  public lekcije: Lekcija[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.getLessonsBySectionId(this.sekcija.SEKCIJA_ID).subscribe((lekcije: Lekcija[]) => {
      this.lekcije = lekcije;
    });
  }

}
