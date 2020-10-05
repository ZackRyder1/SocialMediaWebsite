import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserResolverService } from './UserResolver/user-resolver.service';
import { HomePostsComponent } from './home-posts/home-posts.component';
import { AddPostFormComponent } from './add-post-form/add-post-form.component';
import { DiscoverComponent } from './discover/discover.component';
import { FeedComponent } from './feed/feed.component';


const routes: Routes = [
  {
    path:'true',
    component:FeedComponent
  },
  { 
    path:':userId' , 
    component : HomeComponent , 
    resolve: { user: UserResolverService},
    children:[
      {path:'' , component:HomePostsComponent },
      {path:'addPost',component:AddPostFormComponent}
    ]
  },
  {
    path:'',
    component: DiscoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule { }
