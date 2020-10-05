import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../UserInterface/user';

interface PostCreationResponse{
  message:string;
}

interface ProfileAddResponse{
  message:string;
  profileURL:string;
}

interface UnfollowResponse{
  message:string;
  userIdUnFollowed:string;
}

interface FollowResponse{
  message:string;
  userIdFollowed:string;
}

interface LikeResponse{
  message:string;
  userId:string;
}

export interface SearchUser{
  _id:string;
  username:string;
  profileURL:string;
}

interface SearchUserResponse{
  fetched:boolean;
  result:SearchUser[];
}

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  userRoute = "http://localhost:8080/user";

  feedRoute = "http://localhost:8080/feed";

  constructor(private http:HttpClient) { }

  getUserInfo(userId:string)
  {
    return this.http.get<User>(this.userRoute + '/info/' + userId);
  }

  createPost(formData:FormData)
  {
    return this.http.post<PostCreationResponse>(this.feedRoute + '/create',formData);
  }

  updatePost(postId:String,caption:string)
  {
    return this.http.put<any>(this.feedRoute + '/update/' + postId,caption);
  }

  deletePost(postId:string)
  {
    return this.http.delete<any>(this.feedRoute + '/delete/' + postId);
  }

  commentPost(postId:string,comment:string)
  {
    return this.http.put<any>(this.feedRoute + '/comment/' + postId,comment);
  }

  addProfile(formData:FormData)
  {
    return this.http.put<ProfileAddResponse>(this.userRoute + '/addProfile' ,formData);
  }

  unfollow(userId:string)
  {
    return this.http.delete<UnfollowResponse>(this.userRoute + '/unfollow/' + userId);
  }

  follow(userId:string)
  {
    return this.http.put<FollowResponse>(this.userRoute + '/follow/' + userId,{});
  }

  like(postId:string)
  {
    return this.http.put<LikeResponse>(this.feedRoute + '/like/' + postId,{});
  }

  dislike(postId:string)
  {
    return this.http.delete<LikeResponse>(this.feedRoute + '/dislike/' + postId);
  }

  isLiked(postId:string)
  {
    return this.http.get<{isLiked:Boolean}>(this.feedRoute + '/isLiked/' + postId);
  }

  searchUser(search:string)
  {
    return this.http.get<SearchUserResponse>(this.userRoute + '/searchUser/' + search);
  }

  isFollowed(userId:string)
  {
    return this.http.get<{isFollowed:boolean}>(this.userRoute + '/isFollowed/' + userId);
  }

}
