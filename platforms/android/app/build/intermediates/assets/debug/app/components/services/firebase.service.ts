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
  resetPassword(email) {
    return firebase
      .resetPassword({
        email: email
      })
      .then(
        (result: any) => {
          // alert(JSON.stringify(result));
          return JSON.stringify(result);
        },
        function(errorMessage: any) {
          alert(errorMessage);
        }
      )
      .catch(this.handleErrors);
  }

  add(myTodo: string) {
    return firebase
      .push('/Todos', {
        name: myTodo,
        UID: BackendService.token,
        date: 0 - Date.now()
      })
      .then(
        function(result: any) {
          return 'Gift added to your wishlist!';
        },
        function(errorMessage: any) {
          console.log(errorMessage);
        }
      );
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}
