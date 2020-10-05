import { Component, OnInit ,Input, SimpleChanges,EventEmitter,Output } from '@angular/core';
import { SocialService } from 'src/app/social-media/SocialMService/social.service';
import { PaginatorService } from '../../paginator/paginator.service';

@Component({
  selector: 'app-delete-modal-view',
  templateUrl: './delete-modal-view.component.html',
  styleUrls: ['./delete-modal-view.component.css']
})
export class DeleteModalViewComponent implements OnInit {

  @Input('showModal') showModal: boolean;
  @Input('postId') postId: string;
  @Input('currentPage') currentPage:number;
  @Input('type') type:string;
  @Output('cancel') cancel = new EventEmitter<boolean>();

  constructor(private socialService:SocialService
             ,private paginatorService:PaginatorService) { }

  ngOnInit(): void {

  }

  showModalFunction(){
    if (this.showModal) {

     const popup = document.getElementById("DMV "+ this.type).firstChild as HTMLElement;
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';

    }
  }

  onOK()
  {
      console.log("Deleting the post with id",this.postId);
      this.socialService.deletePost(this.postId).subscribe((response)=>{
      this.cancel.emit(true);
      this.paginatorService.setUrl("http://localhost:8080/feed/userPost");
      this.paginatorService.setPage(1);
      this.paginatorService.setperPage(3);

      this.paginatorService.pagesOutput.subscribe((response)=>{
        console.log(response,"gaand");
      });


      this.paginatorService.totalPages.subscribe((pages)=>{
        console.log(pages);
      })

      this.paginatorService.getPage(this.currentPage);
    });
  }

  onCancel()
  {
    console.log("Will Fetch ",this.currentPage);
    this.cancel.emit(true);
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

}
