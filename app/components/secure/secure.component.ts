import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from 'application-settings';
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
  id: string;
  name: string;
  date: string;
  description: string;
  imagepath: string;
  UID: string;

  public data: Data;
  public datas$: Observable<any>;
  ngOnInit(): void {
    // this.items = this.itemService.getItems();
    console.log('inside oninit');
    this.datas$ = <any>this.firebaseService.getMyWishList();
  }
  public constructor(
    private router: RouterExtensions,
    private firebaseService: FirebaseService
  ) {}
  public logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { clearHistory: true });
  }

  add() {
    this.data = new Data(
      this.id,
      this.name,
      this.date,
      this.description,
      this.imagepath,
      this.UID
    );
    let myTodo: string = this.data.name;
    this.firebaseService.add(myTodo).then((message: any) => {
      this.name = '';
      alert(message);
    });
  }
  delete(data: Data) {
    this.firebaseService.delete(data).catch(() => {
      alert('An error occurred while deleting an item from your list.');
    });
  }

  viewDetail(id: string) {
    this.router.navigate(['/list-detail', id]);
  }
}
