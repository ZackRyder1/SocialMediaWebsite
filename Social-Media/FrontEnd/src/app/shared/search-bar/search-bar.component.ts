import { Component, OnInit } from '@angular/core';
import { SocialService,SearchUser } from 'src/app/social-media/SocialMService/social.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  resultVisible:Boolean = false;
  search:string="";
  searchResults:SearchUser[];

  constructor(private socialService:SocialService) { }

  ngOnInit(): void {
    
  }

  onChange(searchText:string)
  {
    if(searchText.length <=1)
    {
      this.resultVisible = false;
    }
    this.search = searchText;
  }

  onSearchClick()
  {
    if(this.search === "" )
      this.resultVisible = false;
    else
    {
      this.socialService.searchUser(this.search)
      .subscribe(response=>{

        this.searchResults = response.result;
        this.searchResults.map(d=>{
          if(d.profileURL.startsWith("https"))
           {
            
           } 
          else
            { 
              d.profileURL ="http://localhost:8080/" + d.profileURL;
            }  
        });
        this.resultVisible = true;
      })
    }
  }

}
