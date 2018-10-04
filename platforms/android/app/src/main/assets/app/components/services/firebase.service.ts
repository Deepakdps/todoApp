import { Injectable, NgZone } from '@angular/core';
import { BackendService } from './backend.service';
import firebase = require('nativescript-plugin-firebase');
import { User } from '~/components/models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Data } from '~/components/models/data.model';

@Injectable()
export class FirebaseService {
  items: BehaviorSubject<Array<Data>> = new BehaviorSubject([]);
  constructor(private ngZone: NgZone) {}

  private _allItems: Array<Data> = [];
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
          return ' added :) ';
        },
        function(errorMessage: any) {
          console.log(errorMessage);
        }
      );
  }

  delete(data: Data) {
    return firebase.remove('/Todos/' + data.id + '').catch(this.handleErrors);
  }

  getMyWishList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Todos';

      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          // console.log('snapshot', snapshot.value);
          let results = this.handleSnapshot(snapshot.value);
          // console.log(JSON.stringify(results));
          observer.next(results);
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    });
  }

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {
        let result = (<any>Object).assign({ id: id }, data[id]);
        if (BackendService.token === result.UID) {
          this._allItems.push(result);
        }
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

  publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    this.items.next([...this._allItems]);
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}
