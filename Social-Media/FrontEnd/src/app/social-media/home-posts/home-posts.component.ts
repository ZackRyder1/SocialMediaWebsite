import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Post } from '../../shared/paginator/paginator.service';
import { PaginatorService } from '../../shared/paginator/paginator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.css']
})
export class HomePostsComponent implements OnInit {

  @Input('type') type: string = "home"; //Its Working Fine Right Now!!! 

  @Input('userId') userId: string;

  cards: Post[];

  current_page = 1;

  totalPages: number;

  constructor(private paginatorService: PaginatorService,
    private activatedRoute: ActivatedRoute,
    private element:ElementRef) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(rsp => {
      this.userId = rsp.userId;
    })
    if (this.type === "home")
      this.paginatorService.setUrl("http://localhost:8080/feed/userPost/" + this.userId);
    else if(this.type === "discover")
    {
      this.paginatorService.setUrl("http://localhost:8080/feed/posts");
      this.element.nativeElement.style.margin = "2rem";
    }
    else{
      this.paginatorService.setUrl("http://localhost:8080/feed/feedPosts");
      this.element.nativeElement.style.margin = "2rem";
    }
     

    this.paginatorService.setPage(1);
    this.paginatorService.setperPage(3);

    this.paginatorService.pagesOutput.subscribe((response) => {
      this.cards = response;
    });


    this.paginatorService.totalPages.subscribe((pages) => {
      this.totalPages = pages;
    })
    this.paginatorService.getPage(this.current_page);
  }

  changePage(currentPage: number) {
    this.current_page = currentPage;
    console.log("homePost", this.current_page);
    this.paginatorService.pagesInput.next(this.current_page);
  }

}
