import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
const firebase = require('nativescript-plugin-firebase');
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'ns-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public email: String = '';
  public password: String = '';

  public constructor(private router: RouterExtensions) {}
  public login() {
    if (this.email && this.password) {
      firebase
        .login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: this.email,
            password: this.password
          }
        })
        .then(result => {
          // alert(JSON.stringify(result));
          new SnackBar().simple('Correct Credentials!');
          this.router.navigate(['/secure']);
        })
        .catch(error => {
          new SnackBar().simple('Incorrect Credentials!');
        });
    } else {
      new SnackBar().simple('All Fields Required!');
    }
  }
}
