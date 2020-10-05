import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { map, switchMap ,tap, pluck } from 'rxjs/operators';

interface PaginationResponse {
  message:String;
  posts:Post[];
  totalitems:number;
}

export interface Post{
  _id:String;
  Caption:string;
  imageURL:string;
  author:string;
  comments:number;
  likes:number;
}

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  private url:string;
  private perPage:number;
  private page:number;
  pagesInput:Subject<Number>;
  pagesOutput:Observable<Post[]>;
  totalPages:Subject<number> = new Subject();

  public setUrl(url:string)
  {
    this.url = url;
  }

  public setperPage(perPage:number)
  {
    this.perPage = perPage;
  }

  public setPage(page:number)
  {
    this.page = page;
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
            return this.http.get<PaginationResponse>(this.url, {params:params})
          }),
          tap((response)=>{
            const totalPages = Math.ceil(response.totalitems / this.perPage);
            this.totalPages.next(totalPages);
          }),
          pluck('posts')
          )
    }

   getPage(page:number)
   {
     this.pagesInput.next(page);
   }

}
