import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './post-card/post-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { CommentsModalViewComponent } from './ModalViews/comments-modal-view/comments-modal-view.component';
import { PostModalViewComponent } from './ModalViews/post-modal-view/post-modal-view.component';
import { UpdateModalViewComponent } from './ModalViews/update-modal-view/update-modal-view.component';
import { DeleteModalViewComponent } from './ModalViews/delete-modal-view/delete-modal-view.component';
import { LFFModalViewComponent } from './ModalViews/lffmodal-view/lffmodal-view.component';
import { SearchBarComponent } from './search-bar/search-bar.component';




@NgModule({
  declarations: [InputComponent, PostCardComponent, PaginatorComponent, ModalComponent, CommentsModalViewComponent, PostModalViewComponent, UpdateModalViewComponent, DeleteModalViewComponent, LFFModalViewComponent, SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[InputComponent,PostCardComponent,PaginatorComponent,ModalComponent,UpdateModalViewComponent,DeleteModalViewComponent,LFFModalViewComponent,SearchBarComponent]
})
export class SharedModule { }
