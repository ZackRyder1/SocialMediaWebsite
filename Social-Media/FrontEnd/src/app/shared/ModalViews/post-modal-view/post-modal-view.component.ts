import { Component, OnInit, Input, SimpleChanges, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-modal-view',
  templateUrl: './post-modal-view.component.html',
  styleUrls: ['./post-modal-view.component.css']
})
export class PostModalViewComponent implements OnInit {

  @Input('showModal') showModal: boolean;
  @Input('postId') postId: string;
  @Input('imageUrl') imageUrl: string;
  @Input('caption') caption: string;
  @Input('Likes') likes: number;
  @Input('Comments') comments: number;

  @Output('viewLikes') viewLike = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {


  }

  viewLikes()
  {
    this.viewLike.emit(this.postId);
  }

  showModalFunction() {
    if (this.showModal) {
      const popup = document.getElementById(this.postId + ' PMV').firstChild as HTMLElement;
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';

      let image = document.getElementById('post-image') as unknown as HTMLImageElement;
      var imageContainer = document.getElementById('image-containerPMV');

      image.addEventListener('load', function () {
        if (this.naturalWidth > this.naturalHeight) {
          imageContainer.style.width = "40rem";
          imageContainer.style.height = "30rem";
        }
        else {
          imageContainer.style.width = "25rem";
          imageContainer.style.height = "35rem";
        }
      });
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



}



