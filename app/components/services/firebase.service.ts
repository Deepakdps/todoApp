import { Injectable, NgZone } from '@angular/core';
import { BackendService } from './backend.service';
import firebase = require('nativescript-plugin-firebase');
import { User } from '~/components/models/user.model';

@Injectable()
export class FirebaseService {
  register(user: User) {
    return firebase
      .createUser({
        email: user.email,
        password: user.password
      })
      .then(
        function(result: any) {
          return JSON.stringify(result);
        },
        function(errorMessage: any) {
          alert(errorMessage);
        }
      );
  }

  login(user: User) {
    return firebase
      .login({
        type: firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      })
      .then(
        (result: any) => {
          BackendService.token = result.uid;
          return JSON.stringify(result);
        },
        (errorMessage: any) => {
          alert(errorMessage);
        }
      );
  }
}
