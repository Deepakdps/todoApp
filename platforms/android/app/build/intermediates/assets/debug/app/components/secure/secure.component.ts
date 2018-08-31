import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as ApplicationSettings from 'application-settings';
import { Item } from '../../item/item';
import { ItemService } from '../../item/item.service';

@Component({
  moduleId: module.id,
  selector: 'ns-secure',
  templateUrl: 'secure.component.html'
})
export class SecureComponent implements OnInit {
  items: Item[];
  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }
  public constructor(
    private router: RouterExtensions,
    private itemService: ItemService
  ) {}
  public logout() {
    this.router.navigate(['/login']);
  }
}
