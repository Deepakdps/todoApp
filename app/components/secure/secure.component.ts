import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from 'application-settings';
import { Item } from '../../item/item';
import { ItemService } from '../../item/item.service';
import { Observable } from 'rxjs';
import { Data } from '~/components/models/data.model';
import { FirebaseService } from '~/components/services/firebase.service';
const firebase = require('nativescript-plugin-firebase');

@Component({
  moduleId: module.id,
  selector: 'ns-secure',
  templateUrl: 'secure.component.html'
})
export class SecureComponent implements OnInit {
  data: Data;

  items: Item[];
  name: string;
  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }
  public constructor(
    private router: RouterExtensions,
    private itemService: ItemService,
    private ngZone: NgZone,
    private firebaseService: FirebaseService
  ) {
    this.data = new Data();
    this.data.id = '';
    this.data.date = '';
    this.data.description = '';
    this.data.name = '';
    this.data.UID = '';
  }
  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  add() {
    let myTodo: string = this.name;
    this.firebaseService.add(myTodo).then((message: any) => {
      //  this.name = "";
      alert(message);
    });
  }
  // getMyTodos(): Observable<any> {
  //   return firebase.query('/Todos', {
  //     //   // set this to true if you want to check if the value exists or just want the event to fire once
  //     //   // default false, so it listens continuously.
  //     //   // Only when true, this function will return the data in the promise as well!
  //     //   singleEvent: true,
  //     //   orderBy: {
  //     //     type: firebase.QueryOrderByType.CHILD,
  //     //     value: 'since' // mandatory when type is 'child'
  //     //   }
  //   });
  // }
}
