import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { map, switchMap ,tap, pluck } from 'rxjs/operators';
import { Post } from '../paginator.service';

interface CommentPageResponse{
  message:string;
  totalitems:number;
  comments:{
    comments:Comment[];
  }
}

export interface Comment{
  _id:string;
  userId:{
    _id:string;
    profileURL:string;
  }
  username:string;
  comment:string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsPaginatorService {

  private url:string;
  private perPage:number = 3;
  pagesInput:Subject<Number>;
  pagesOutput:Observable<any>;
  totalPages:Subject<number> = new Subject();


  public setUrl(postId:string)
  {
    this.url ="http://localhost:8080/feed/getComments/" + postId;
    console.log(this.url);
  }



  constructor(private http:HttpClient) {

    this.pagesInput= new Subject();
    this.pagesOutput = this.pagesInput.pipe(
          map((page)=>{
              return new HttpParams().
              set('page',String(page))
              .set('perPage',String(this.perPage));
          }),
          switchMap((params)=>{
            return this.http.get<CommentPageResponse>(this.url, {params:params})
          }),
          tap((response)=>{
            const totalPages = Math.ceil(response.totalitems / this.perPage);
            this.totalPages.next(totalPages);
          }),
          pluck('comments','comments')
          )
    }

   getPage(page:number)
   {
     this.pagesInput.next(page);
   }
}
