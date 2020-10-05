import { Injectable } from '@angular/core';
import { Resolve ,ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../UserInterface/user';
import { SocialService } from '../SocialMService/social.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User>{

  constructor(private socialService:SocialService) { }

  resolve(route:ActivatedRouteSnapshot){

    const userId = route.params.userId;

    return this.socialService.getUserInfo(userId);

  }
}
