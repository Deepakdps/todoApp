import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
const firebase = require('nativescript-plugin-firebase');
import { RouterExtensions } from 'nativescript-angular/router';
import { User } from '~/components/models/user.model';
import { FirebaseService } from '~/components/services/firebase.service';

@Component({
  moduleId: module.id,
  selector: 'ns-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  user: User;

  constructor(
    private router: RouterExtensions,
    private firebaseService: FirebaseService
  ) {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
  }
  public login() {
    this.firebaseService
      .login(this.user)
      .then(() => {
        this.router.navigate(['/secure'], { clearHistory: true });
      })
      .catch((message: any) => {
        alert(message);
      });
  }
}
