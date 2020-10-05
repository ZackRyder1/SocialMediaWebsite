import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../AuthService/auth.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(private authService : AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.isSignedIn().subscribe(
      {next : (response)=>{
                  if(response.authenticated)
                    this.router.navigateByUrl('/home/' + localStorage.getItem('user'));
                      
              },
      error : (err)=>{console.log(err)}});
  }

  authForm = new FormGroup({
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password :new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });

  onSubmit(){
    if(this.authForm.invalid)
    {
      return;
    }

    this.authService.signIn(this.authForm.value).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/home/' + response.userId);
      },
      error: (error)=>{ 
        this.authForm.setErrors({UnP: true});
      }
    }
    );
     
  }

}
