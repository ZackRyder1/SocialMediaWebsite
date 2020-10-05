import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { } from '../paginator/paginator.service';
import { Comment } from '../paginator/PaginatorServices/comments-paginator.service';
import { SocialService } from 'src/app/social-media/SocialMService/social.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input('PostId') postId: string
  @Input('imageUrl') imageUrl: string;
  @Input('caption') caption: string;
  @Input('Likes') likes: number;
  @Input('Comments') comments: number;

  whichModal: string;
  modalCommentVisible: boolean = false;
  modalPMVisible: boolean = false;


  @Output('caption') captionUMV = new EventEmitter<{ caption: string, postId: string }>();
  @Output('postId') postIdDMV = new EventEmitter<string>();
  @Output('viewLikes') viewLikeLFF = new EventEmitter<string>();

  EDVisible:boolean = null;



  constructor(private element: ElementRef,
    private socialService: SocialService,
    private router: Router) {
    if (this.router.url.startsWith('/home')) {
      this.EDVisible = true;
    }
    else {
      this.EDVisible = false;
    }
  }

  ngOnInit(): void {

    let myElement = this.element.nativeElement.firstChild.firstChild.firstChild;
    this.imageUrl = "http://localhost:8080/" + this.imageUrl;
    myElement.style.backgroundImage = "url('" + this.imageUrl + "')";

    let LikeButton = this.element.nativeElement.firstChild.firstChild.childNodes[2].firstChild.firstChild;

    this.socialService.isLiked(this.postId)
      .subscribe(rsp => {
        if (rsp.isLiked) {
          LikeButton.id = "heart-active";
        }
        else {
          LikeButton.id = "heart";
        }
      });
  }

  onClickShow() {

    this.modalCommentVisible = true;
    this.whichModal = ' Comments-Modal';

  }

  onClickPMVShow() {
    this.modalPMVisible = true;
    this.whichModal = ' PMV';
  }

  onClickUMVShow() {
    this.captionUMV.emit({ caption: this.caption, postId: this.postId });
  }

  onClickDMVShow() {
    this.postIdDMV.emit(this.postId);
  }

  viewLike(postId: string) {
    this.viewLikeLFF.emit(postId);
  }

  onCloseModal(visible: boolean) {
    if (this.whichModal === ' PMV') {
      this.modalPMVisible = visible;
      return;
    }
    this.modalCommentVisible = visible;
  }

  onLikeClick(element: HTMLElement) {
    if (element.id === "heart") {
      this.socialService.like(this.postId).subscribe(response => {
        element.id = "heart-active";
      });
    }
    else {
      this.socialService.dislike(this.postId).subscribe(response => {
        element.id = "heart";
      });
    }
  }



}
