import { Component, OnInit } from '@angular/core';
const firebase = require('nativescript-plugin-firebase');
import { Router } from '@angular/router';
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  localUser: any;
  constructor(private router: Router) {
    this.localUser = localStorage.getItem('loggedIn');
    if (this.localUser) {
      console.log('heyhey i am already logged in');
      this.router.navigate(['secure']);
    } else {
      console.log('heyhey i am not logged in');
      this.router.navigate(['login']);
    }
  }
}
