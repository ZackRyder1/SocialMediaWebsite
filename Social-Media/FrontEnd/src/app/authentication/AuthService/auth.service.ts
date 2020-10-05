import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available : boolean;
}

interface SignUpCredentials{
  email:string;
  username:string;
  password:string;
}

interface SignUpResponse{
  isSuccess : boolean;
}

interface SignInCredentials{
  email:string;
  password:string;
}

interface SignInResponse{
  token:string;
  userId:string;
}

interface CheckAuthResponse{
  authenticated : boolean;
}

interface SignOutResponse{
  loggedOutUser : boolean;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signedIn$:BehaviorSubject<boolean> = new BehaviorSubject(null);

  userRoute = "http://localhost:8080/user";

  constructor(private http:HttpClient) { }

  emailAvailable(email:string)
  {
      return this.http.post<UsernameAvailableResponse>( this.userRoute + "/email", {
        email
      });
  }

  userAvailable(username:string)
  {
      return this.http.post<UsernameAvailableResponse>( this.userRoute + "/username", {
        username
      });
  }

  signUp(credentials:SignUpCredentials)
  {
    return this.http.post<SignUpResponse>( this.userRoute + "/signup",credentials);
  }

  signIn(credentials:SignInCredentials)
  {
    return this.http.post<SignInResponse>(this.userRoute + '/login',credentials)
    .pipe(tap((response)=>{
      this.signedIn$.next(true);
      localStorage.setItem('token', "Bearer "+ response.token);
      localStorage.setItem('user',response.userId);
    })
    );
  }

  isSignedIn()
  {
    return this.http.get<CheckAuthResponse>(this.userRoute + '/isSignedIn')
    .pipe(
      tap((response)=>{
        this.signedIn$.next(response.authenticated);
    }));
  }

  signOut(){
    return this.http.post<SignOutResponse>( this.userRoute + '/signOut',{})
    .pipe(
      tap(()=>{
        this.signedIn$.next(false);
        localStorage.removeItem('token');
      })
    );
  }

}
