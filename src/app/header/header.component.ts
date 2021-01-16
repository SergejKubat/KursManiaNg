import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMenu: boolean = false;
  public searchResultDisplay: boolean = false;

  public query: string;

  constructor() { }

  ngOnInit(): void {
  }

  public getResults() {
    console.log(this.query);
  }

  public onSubmit() {
    console.log('submitovano');
  }

}
