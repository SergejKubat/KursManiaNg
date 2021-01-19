import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public overviewVisibility: boolean = true;
  public contentVisibility: boolean = false;
  public authorVisibility: boolean = false;
  public reviewsVisibility: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public showTab(index: number): void {
    // RESET
    this.overviewVisibility = false;
    this.contentVisibility = false;
    this.authorVisibility = false;
    this.reviewsVisibility = false;

    switch(index) {
      case 1:
        this.overviewVisibility = true;
        break;
      case 2:
        this.contentVisibility = true;
        break;
      case 3:
        this.authorVisibility = true;
        break;
      case 4:
        this.reviewsVisibility = true;
      break;
    }
  }

}
