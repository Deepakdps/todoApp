import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
const firebase = require('nativescript-plugin-firebase');
import { RouterExtensions } from 'nativescript-angular/router';
import { User } from '~/components/models/user.model';
import { FirebaseService } from '~/components/services/firebase.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { prompt } from 'ui/dialogs';
var localStorage = require('nativescript-localstorage');

@Component({
  moduleId: module.id,
  selector: 'ns-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private router: RouterExtensions,
    private firebaseService: FirebaseService,
    private _page: Page
  ) {
    this.user = new User();
    this.user.email = 'deepakdps431@gmail.com';
    this.user.password = 'dddpppsss';
  }
  ngOnInit() {
    this._page.actionBarHidden = true;
  }
  public login() {
    this.firebaseService
      .login(this.user)
      .then(result => {
        if (result) {
          console.log('result', result);
          localStorage.setItem('loggedIn', JSON.stringify(this.user.email));
          this.router.navigate(['/secure'], { clearHistory: true });
        }
      })
      .catch((message: any) => {
        alert(message);
      });
  }
  forgotPassword() {
    prompt({
      title: 'Forgot Password',
      message:
        'Enter the email address you used to register to reset your password.',
      defaultText: '',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then(data => {
      if (data.result) {
        this.firebaseService
          .resetPassword(data.text.trim())
          .then((result: any) => {
            if (result) {
              alert(result);
            } else {
              alert('pls type correct email');
            }
          });
      }
    });
  }
}
