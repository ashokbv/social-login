import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginMessage:string = "";
  model: any = {};
  loading = false;
  constructor(
    private authenticationService : AuthenticationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.loginMessage = "Successfully logged-in.";
          this.loading = false;
          this.router.navigate(['dashboard']);
        },
        error => {
          this.loginMessage = "Username or password is incorrect."
          this.loading = false;
        });
  }

}
