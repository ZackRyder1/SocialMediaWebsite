import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocialService } from 'src/app/social-media/SocialMService/social.service';

@Component({
  selector: 'app-update-modal-view',
  templateUrl: './update-modal-view.component.html',
  styleUrls: ['./update-modal-view.component.css']
})
export class UpdateModalViewComponent implements OnInit {

  @Input('showModal') showModal: boolean;
  @Input('captionPost') captionPost: {caption:string,postId:string};
  @Input('postId') postId: string;
  @Input('type') type:string;

  updateForm = new FormGroup(
    {
      caption: new FormControl('')
    }
  );


  showModalFunction()
  {
    if (this.showModal) {

      this.updateForm.setValue({caption:this.captionPost.caption});

      const popup = document.getElementById("UMV " + this.type).firstChild as HTMLElement;
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';
    }
  }

  onSubmit(){
    this.socialService.updatePost(this.captionPost.postId,this.updateForm.value)
    .subscribe(response=>{
    });
  }

  constructor(private socialService:SocialService) { }

  ngOnInit(): void {
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
