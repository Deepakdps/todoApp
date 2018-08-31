import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
import * as ApplicationSettings from 'application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
const firebase = require('nativescript-plugin-firebase');
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'ns-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  public email: String = '';
  public password: String = '';
  public firstname: String = '';
  public lastname: String = '';

  public constructor(private location: Location) {}
  public register() {
    if (this.firstname && this.lastname && this.email && this.password) {
      firebase
        .createUser({
          email: this.email,
          password: this.password
        })
        .then(
          user => {
            console.log(user);
            firebase.push('/Users', {
              email: this.email,
              uid: user.key,
              password: this.password
            });
          },
          error => {
            console.log('error' + error);
          }
        );

      this.location.back();
    } else {
      new SnackBar().simple('All Fields Required!');
    }
  }
  public goBack() {
    this.location.back();
  }
}
