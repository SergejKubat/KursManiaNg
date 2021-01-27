import { Component, OnInit } from '@angular/core';
import { Kategorija } from '../models/kategorija.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMenu: boolean = false;
  public searchResultDisplay: boolean = false;

  public query: string;

  public kategorije: Kategorija[] =[];

  constructor(private categoriesService: CategoriesService) {
    this.categoriesService.getCategories().subscribe((kategorije: Kategorija[]) => {
      this.kategorije = kategorije;
    });
  }

  ngOnInit(): void {
  }

}
