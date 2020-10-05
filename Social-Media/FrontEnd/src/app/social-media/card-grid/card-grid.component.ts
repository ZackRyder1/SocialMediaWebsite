import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../shared/paginator/paginator.service'; 

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit {

  @Input('type') type:string;

  @Input('currentPage') currentPage:number;

  showUpdateModal:boolean;

  showDeleteModal:boolean;

  whichModal:string;

  @Input('CardData') cardData:Post[];

  captionPostUMV:{caption:string,postId:string};

  postIdDMV:string;

  postIdUMV:string;

  cancelDMV:boolean =false;

  likePostId:string;

  showLFFModal:boolean;

  constructor() { }

  ngOnInit(): void {
    
  }

  showLikeModal(postId:string)
  {
    this.showLFFModal = true;
    this.whichModal="like " + this.type;
    this.likePostId = postId;
  }


  showUMVModal(captionPost:{caption:string,postId:string})
  {
    this.showUpdateModal = true;
    this.captionPostUMV = captionPost;
    this.whichModal='UMV ' + this.type;
  }

  showDMVModal(postId:string)
  {
    this.showDeleteModal = true;
    this.postIdDMV = postId;
    this.whichModal='DMV ' + this.type;
  }

  onUMVCloseModal(visible:boolean)
  {
    this.showUpdateModal = visible;
  }

  onLikeCloseModal(visible){
    this.showLFFModal = false;
  }

  onDMVCloseModal(visible:boolean)
  {
    this.showDeleteModal = visible;
  }
  
  onDMVCancelModal(visible:boolean)
  {
    this.showDeleteModal = visible;
    this.cancelDMV = visible;
  }

  onDMVCancel(cancel:boolean){
    this.cancelDMV = cancel;
  }

}
