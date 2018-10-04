import { Component, OnInit } from '@angular/core';
const firebase = require('nativescript-plugin-firebase');
import { Router } from '@angular/router';
import { BackendService } from '~/components/services/backend.service';
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  localUser: any;
  constructor(private router: Router) {
    this.localUser = localStorage.getItem('loggedIn');

    firebase
      .init({
        //persist should be set to false as otherwise numbers aren't returned during livesync
        persist: false,
        onAuthStateChanged: (data: any) => {
          // console.log(JSON.stringify(data));
          if (data.loggedIn) {
            console.log(data.user.uid);
            BackendService.token = data.user.uid;
            if (this.localUser) {
              console.log('heyhey i am already logged in');
              this.router.navigate(['secure']);
            } else {
              console.log('heyhey i am not logged in');
              this.router.navigate(['login']);
            }
          } else {
            BackendService.token = '';
          }
        }
      })
      .then(
        function(instance) {
          console.log('firebase.init done');
        },
        function(error) {
          console.log('firebase.init error: ' + error);
        }
      );
  }
}
