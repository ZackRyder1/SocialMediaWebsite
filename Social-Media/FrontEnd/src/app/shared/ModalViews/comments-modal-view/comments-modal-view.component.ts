import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comment, CommentsPaginatorService } from '../../paginator/PaginatorServices/comments-paginator.service';
import { SocialService } from '../../../social-media/SocialMService/social.service';

@Component({
  selector: 'app-comments-modal-view',
  templateUrl: './comments-modal-view.component.html',
  styleUrls: ['./comments-modal-view.component.css']
})
export class CommentsModalViewComponent implements OnInit {

  @Input('showModal') showModal: boolean;
  @Input('Comments') comments: Comment[];
  @Input('totalPages') totalPages: number;
  @Input('PostId') postId: string;
  pageOutputSubscription;
  totalPagesSubscription;

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required
    ]
    )
  });


  constructor(private paginatorService: CommentsPaginatorService,
              private socialService:SocialService) {

  }

  ngOnInit(): void {

  }

  changePage(currentPage: number) {
    this.paginatorService.getPage(currentPage);
  }

  showModalfunction() {
    if (this.showModal) {

      this.paginatorService.setUrl(this.postId);

      this.pageOutputSubscription = this.paginatorService.pagesOutput.subscribe(comments => {
        this.comments = comments;
        
        this.comments.map(d=>{
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

      this.paginatorService.getPage(1);

      const popup = document.getElementById(this.postId + ' Comments-Modal').firstChild as HTMLElement;
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

  onSubmit() {

    this.socialService.commentPost(this.postId,this.commentForm.value)
    .subscribe(response=>{
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'showModal': {
            this.showModalfunction();
          }
        }
      }
    }
  }


}
