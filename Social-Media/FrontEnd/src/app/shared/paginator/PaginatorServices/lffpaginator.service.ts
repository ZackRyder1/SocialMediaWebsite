import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { map, switchMap ,tap, pluck } from 'rxjs/operators';

interface LFFResponse{
  fetched:boolean;
  result:any;
  totalitems:number;
}

@Injectable({
  providedIn: 'root'
})
export class LFFPaginatorService {

  private url:string;
  private perPage:number = 5;
  pagesInput:Subject<Number>;
  pagesOutput:Observable<any>;
  totalPages:Subject<number> = new Subject();
  typeModal:string;


  public setUrl(type:string , Id:string)
  {
    if(type.startsWith("like"))
    {
      this.url ="http://localhost:8080/feed/getLikes/" + Id;
      this.typeModal='likes';
    }
    else if(type === "followersModal")
    {
      this.url = "http://localhost:8080/user/getFollowers/" + Id;
      this.typeModal = 'followers';
    }
    else if(type === "followingModal")
    {
      this.url = "http://localhost:8080/user/getFollowing/" + Id;
      this.typeModal = 'following'; 
    } 
    
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
            return this.http.get<LFFResponse>(this.url, {params:params})
          }),
          tap((response)=>{
            const totalPages = Math.ceil(response.totalitems / this.perPage);
            this.totalPages.next(totalPages);
          }),
          pluck('result')
          )
    }

   getPage(page:number)
   {
     this.pagesInput.next(page);
   }


}
