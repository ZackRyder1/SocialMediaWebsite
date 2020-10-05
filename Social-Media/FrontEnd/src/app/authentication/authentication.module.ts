import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SignOutComponent } from './sign-out/sign-out.component';

@NgModule({
  declarations: [SignInComponent,SignUpComponent, SignOutComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [SignInComponent,SignUpComponent]
})
export class AuthenticationModule { }
