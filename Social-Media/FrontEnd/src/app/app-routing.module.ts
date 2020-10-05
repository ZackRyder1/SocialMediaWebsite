import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';


const routes: Routes = [
    { 
      path:'home', 
      canLoad : [AuthGuard],
      loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule)
    },
    {
      path:'discover',
      canLoad : [AuthGuard],
      loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule)
    },
    {
      path:'user',
      canLoad : [AuthGuard],
      loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule)
    },
    {
      path:'feed',
      canLoad : [AuthGuard],
      loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
