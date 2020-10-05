import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthService } from './AuthService/auth.service';


const routes: Routes = [
  { path: '' , component: SignInComponent },
  { path: 'signUp' , component: SignUpComponent },
  { path: 'signOut' , component: SignOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
