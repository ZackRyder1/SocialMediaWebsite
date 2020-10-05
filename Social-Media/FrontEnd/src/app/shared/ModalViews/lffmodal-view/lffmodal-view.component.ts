import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import { LFFPaginatorService } from '../../paginator/PaginatorServices/lffpaginator.service';
import { SocialService } from 'src/app/social-media/SocialMService/social.service';


interface LFFResponse{
  _id:string;
  userId:{
    _id:string;
    profileURL:string;
  };
  username:string;
  followed:boolean;
}

@Component({
  selector: 'app-lffmodal-view',
  templateUrl: './lffmodal-view.component.html',
  styleUrls: ['./lffmodal-view.component.css']
})
export class LFFModalViewComponent implements OnInit {

  @Input('showModal') showModal: boolean;
  @Input('Id') Id: string;
  @Input('type') ModalType: string;
  @Input('whereType') type:string;


  currentPage:number = 1;

  data:LFFResponse[];

  isFollowed:boolean=true;

  test:string = "follow";

  totalPages:number;

  pageOutputSubscription;
  totalPagesSubscription;

  constructor(private paginatorService:LFFPaginatorService,private socialService:SocialService) { }

  ngOnInit(): void {
    
  }

  showModalFunction(){
    if (this.showModal) {

  
      this.paginatorService.setUrl(this.ModalType,this.Id);    

      this.pageOutputSubscription = this.paginatorService.pagesOutput.subscribe(result => {
          if(this.ModalType === "followingModal")
            this.data = result.following;
          else if(this.ModalType === "followersModal") 
            this.data = result.followers;
          else{

            this.data = result.likes;
            
          }
             
      this.data.map(d=>{
        if(d.userId.profileURL.startsWith("https"))
         {
          
         } 
        else
          { 
            d.userId.profileURL ="http://localhost:8080/" + d.userId.profileURL;
          }  
      });
          
      });

      

     this.totalPagesSubscription = this.paginatorService.totalPages.subscribe(total => {
        this.totalPages = total;
      });

      this.paginatorService.getPage(this.currentPage);

      if(this.ModalType === "like")
        this.ModalType= "like " + this.type;
      const popup = document.getElementById(this.ModalType).firstChild as HTMLElement;
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';
    }
    else {

      if (this.pageOutputSubscription)
      {
        this.pageOutputSubscription.unsubscribe();
        this.totalPagesSubscription.unsubscribe();
      }
      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'showModal': {
            this.showModalFunction();
          }
        }
      }
    }
  }

  changePage(currentPage:number)
  {
    this.currentPage = currentPage;
    this.paginatorService.getPage(this.currentPage);
  }

  onFollowClick(value:HTMLElement,index:number)
  {
    if(value.innerText === "UnFollow")
    {
      this.socialService.unfollow(this.data[index].userId._id)
      .subscribe(response=>{
        value.innerText = "Follow";
      });
    }
    else 
    {
      this.socialService.follow(this.data[index].userId._id)
      .subscribe(response=>{
        value.innerText = "UnFollow";
      });
    }  
  }

  onUnfollowClick()
  {
    this.isFollowed = true;
  }

}
