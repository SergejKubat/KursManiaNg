import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/autor.model';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  public autori: Autor[] = [];

  constructor(private autorService: AutorService) {
    this.autorService.getAuthors().subscribe((autori: Autor[]) => {
      this.autori = autori;
    });
  }

  ngOnInit(): void {
  }

}
