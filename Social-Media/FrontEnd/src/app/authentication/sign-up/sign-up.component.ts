import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatch } from '../validators/password-match';
import { EmailCheck } from '../validators/email-check';
import { UserCheck } from '../validators/user-check';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  authForm = new FormGroup({
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ],[this.emailCheck.validate]),
    username:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ],[this.userCheck.validate]),
    password :new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  },[this.matchPassword.validate]);

  constructor(private matchPassword:PasswordMatch 
              ,private emailCheck:EmailCheck
              ,private userCheck : UserCheck
              ,private authService:AuthService
              ,private router:Router) { }

  ngOnInit(): void {
    this.authService.isSignedIn().subscribe(
      {next : (response)=>{
                  if(response.authenticated)
                    this.router.navigateByUrl('/home/' + localStorage.getItem('user'));
                      
              },
      error : (err)=>{console.log(err)}});
  }


  onSubmit(){
    if(this.authForm.invalid)
      return;
    
    this.authService.signUp(this.authForm.value).subscribe((response)=>{
      if(response.isSuccess)
        {
          this.router.navigateByUrl('/');
        }
    }
    );
  }

}
