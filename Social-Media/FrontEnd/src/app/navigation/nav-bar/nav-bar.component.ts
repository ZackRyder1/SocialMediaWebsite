import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/AuthService/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userId:string = localStorage.getItem('user');



  signedIn:BehaviorSubject<boolean>;

  constructor(private authService:AuthService,private router:Router) {
    this.signedIn = this.authService.signedIn$;
   }

  ngOnInit(): void {
      
  }

}
