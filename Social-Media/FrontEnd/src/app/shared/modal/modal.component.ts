import { Component, OnInit, Input , Output,EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('showModal') showModal:string;
  @Input('Title') title:string;
  @Input('postId') postId:string;
  @Output('close') closeModal = new EventEmitter<boolean>();
  @Output('cancel') cancelModal = new EventEmitter<boolean>();

  @Input('type') type:string;

  @Input('cancel') closeDMVModal:boolean = false;

  constructor() { }

  ngOnInit(): void {
    // const popup = document.getElementById("popup1");
    // popup.style.visibility = 'visible';
    // popup.style.opacity = '1';
  }

  onClickShow()
  {
    const popup = document.getElementById("popup1");
    popup.style.visibility = 'visible';
    popup.style.opacity = '1';
  }

  onClick(cancel:boolean)
  {

    if(this.showModal === "followers")
    {
      const popup = document.getElementById("followersModal").firstChild as HTMLElement;
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      this.closeModal.emit(false);
      return;
    }

    if(this.showModal === "following")
    {
      const popup = document.getElementById("followingModal").firstChild as HTMLElement;
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      this.closeModal.emit(false);
      return;
    }
    
    if(this.showModal === "like " + this.type)
    {
      const popup = document.getElementById(this.showModal).firstChild as HTMLElement;
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      this.closeModal.emit(false);
      return;
    }

    if(this.showModal === 'DMV ' + this.type)
    {
      const popup = document.getElementById(this.showModal).firstChild as HTMLElement;
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      if(cancel)
        {
          // this.closeDMVModal = false;
          this.cancelModal.emit(false);
          return;
        }
      this.closeModal.emit(false);
      return;
    }

    if(this.showModal === 'UMV ' + this.type)
    {
      const popup = document.getElementById(this.showModal).firstChild as HTMLElement;
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      this.closeModal.emit(false);
      return;
    }

    const popup = document.getElementById(this.postId + this.showModal).firstChild as HTMLElement;
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
    this.closeModal.emit(false);
  }

  showCommentView(visible:boolean)
  {

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'closeDMVModal':{
            if(this.closeDMVModal)
              this.onClick(true);
          }
        }
      }
    }
  }

}
