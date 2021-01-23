import { Component, OnInit } from '@angular/core';
import { Kategorija } from '../models/kategorija.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public kategorije: Kategorija[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
