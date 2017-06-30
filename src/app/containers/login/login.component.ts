import { Component, OnInit } from '@angular/core';
import {AuthService, IUser} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: IUser = {
    email: 'asda',
    nickname: 'test',
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.auth.loginAsUser(this.user)
      .then(() => {
      this.router.navigate(['home']);
      });
  }
}
