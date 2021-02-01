import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Kategorija } from '../models/kategorija.model';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public showMenu: boolean = false;
  public searchResultDisplay: boolean = false;

  public query: string;

  public kategorije: Kategorija[] =[];

  private authListenerSubs: Subscription;

  public isAuthentificated: boolean = false;

  constructor(private categoriesService: CategoriesService, private authService: AuthService) {
    this.categoriesService.getCategories().subscribe((kategorije: Kategorija[]) => {
      this.kategorije = kategorije;
    });
  }

  ngOnInit(): void {
    this.isAuthentificated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuthentificated = isAuth;
    });
  }

  public onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}
