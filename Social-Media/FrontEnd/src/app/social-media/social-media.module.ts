import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CardGridComponent } from './card-grid/card-grid.component';
import { HomePostsComponent } from './home-posts/home-posts.component';
import { AddPostFormComponent } from './add-post-form/add-post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DiscoverComponent } from './discover/discover.component';
import { FeedComponent } from './feed/feed.component';


@NgModule({
  declarations: [HomeComponent, CardGridComponent, HomePostsComponent, AddPostFormComponent, DiscoverComponent, FeedComponent],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[]
})
export class SocialMediaModule { }
