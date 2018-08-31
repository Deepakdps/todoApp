import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
import * as ApplicationSettings from 'application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
const firebase = require('nativescript-plugin-firebase');
import { Location } from '@angular/common';
import { User } from '~/components/models/user.model';
import { FirebaseService } from '~/components/services/firebase.service';

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

  constructor(
    private location: Location,
    private firebaseService: FirebaseService
  ) {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
  }
  user: User;
  public register() {
    this.firebaseService
      .register(this.user)
      .then(() => {
        alert('user added sucessfully');
      })
      .catch((message: any) => {
        alert(message);
      });
  }
  public goBack() {
    this.location.back();
  }
}
