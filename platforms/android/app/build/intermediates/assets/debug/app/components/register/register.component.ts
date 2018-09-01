import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
import * as ApplicationSettings from 'application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
const firebase = require('nativescript-plugin-firebase');
import { Location } from '@angular/common';
import { User } from '~/components/models/user.model';
import { FirebaseService } from '~/components/services/firebase.service';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  moduleId: module.id,
  selector: 'ns-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(
    private location: Location,
    private firebaseService: FirebaseService,
    private router: RouterExtensions,
    private _page: Page
  ) {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
  }
  ngOnInit() {
    this._page.actionBarHidden = true;
  }

  user: User;
  public register() {
    this.firebaseService
      .register(this.user)
      .then(result => {
        if (result) {
          alert('user added sucessfully');
          this.router.navigate(['/login'], { clearHistory: true });
        }
      })
      .catch((message: any) => {
        alert(message);
      });
  }
  public goBack() {
    this.location.back();
  }
}
