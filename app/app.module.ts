import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LoginComponent } from '~/components/login/login.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { RegisterComponent } from '~/components/register/register.component';
import { SecureComponent } from '~/components/secure/secure.component';
import { BackendService } from '~/components/services/backend.service';
import { FirebaseService } from '~/components/services/firebase.service';
import { SecureDetailComponent } from '~/components/secure-detail/secure-detail.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, NativeScriptFormsModule],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SecureComponent,
    SecureDetailComponent
  ],
  providers: [BackendService, FirebaseService],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
