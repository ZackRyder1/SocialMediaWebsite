import { Component } from '@angular/core';
import { AuthService } from './authentication/AuthService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService:AuthService){}

  ngOnInit()
  {
      this.authService.isSignedIn().subscribe(
        {next : (response)=>{
                        
                },
        error : (err)=>{}});
  }

}
