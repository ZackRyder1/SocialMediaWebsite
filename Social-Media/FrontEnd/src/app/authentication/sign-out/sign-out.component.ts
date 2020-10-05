import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private authService:AuthService , private router:Router) { }

  ngOnInit(): void {
    this.authService.signOut().subscribe(()=>{ 
        this.router.navigateByUrl('/');
    })
  }

}
