import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from 'application-settings';
import { Item } from '../../item/item';
import { ItemService } from '../../item/item.service';
import { Observable } from 'rxjs';
const firebase = require('nativescript-plugin-firebase');

@Component({
  moduleId: module.id,
  selector: 'ns-secure',
  templateUrl: 'secure.component.html'
})
export class SecureComponent implements OnInit {
  public items$: Observable<any>;
  name: String;
  _allItems: any[];
  ngOnInit(): void {
    // this.items = this.itemService.getItems();
    this.items$ = <any>this.getMyTodos();
  }
  public constructor(
    private router: RouterExtensions,
    private itemService: ItemService,
    private ngZone: NgZone
  ) {}
  public logout() {
    this.router.navigate(['/login']);
  }
  getMyTodos(): Observable<any> {
    return firebase.query('/Todos', {
      //   // set this to true if you want to check if the value exists or just want the event to fire once
      //   // default false, so it listens continuously.
      //   // Only when true, this function will return the data in the promise as well!
      //   singleEvent: true,
      //   orderBy: {
      //     type: firebase.QueryOrderByType.CHILD,
      //     value: 'since' // mandatory when type is 'child'
      //   }
    });
  }

  add() {
    firebase.push('/Todos', { name: this.name }).then(
      function(result: any) {
        console.log('created key: ' + result.key);
      },
      function(errorMessage: any) {
        console.log(errorMessage);
      }
    );
  }
}
