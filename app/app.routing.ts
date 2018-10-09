import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from '~/components/login/login.component';
import { RegisterComponent } from '~/components/register/register.component';
import { SecureComponent } from '~/components/secure/secure.component';
import { SecureDetailComponent } from '~/components/secure-detail/secure-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'secure-detail/:id', component: SecureDetailComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
