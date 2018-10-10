import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from 'application-settings';
import { Observable } from 'rxjs';
import { Data } from '~/components/models/data.model';
import { FirebaseService } from '~/components/services/firebase.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'ns-secure-detail',
  templateUrl: 'secure-detail.component.html'
})
export class SecureDetailComponent implements OnInit {
  id: string;
  name: string;
  description: string;
  imagepath: string;
  image: any;
  private sub: any;
  private imagePath: string;
  private uploadedImageName: string;
  private uploadedImagePath: string;
  public gift: Observable<any>;
  constructor(
    private _page: Page,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private firebaseService: FirebaseService,
    private location: Location
  ) {}
  ngOnInit() {
    this._page.actionBarHidden = true;
    this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.firebaseService.getMyTodo(this.id).subscribe(gift => {
        this.ngZone.run(() => {
          for (let prop in gift) {
            //props
            if (prop === 'id') {
              this.id = gift[prop];
            }
            if (prop === 'name') {
              this.name = gift[prop];
            }
            if (prop === 'description') {
              this.description = gift[prop];
            }
          }
        });
      });
    });
  }

  editTodo(id: string) {
    this.firebaseService.editName(id, this.name).then(
      (result: any) => {
        alert(result);
        if (result) {
          this.location.back();
        }
      },
      (error: any) => {
        alert(error);
      }
    );
  }
  cancel() {
    this.location.back();
  }
}
