import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  public onLogIn(form: NgForm) {
    if (form.valid) {
      this.authService.logIn(form.value.email, form.value.password).subscribe(result => {
        console.log(result);
      });
    }
  }

}
