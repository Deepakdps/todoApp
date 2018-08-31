import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { LoginComponent } from '~/components/login/login.component';
import { RegisterComponent } from '~/components/register/register.component';
import { SecureComponent } from '~/components/secure/secure.component';

const routes: Routes = [
  { path: '', redirectTo: '/secure', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
