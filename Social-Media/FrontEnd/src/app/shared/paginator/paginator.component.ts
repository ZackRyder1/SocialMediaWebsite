import { Component, OnInit ,Input ,Output ,EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Output('changeCurrent') currentChange = new EventEmitter<number>();
  @Input('currentPage') currentPage:number = 1;
  pageOptions:number[];
  @Input() totalPages:number =1;

 url = "http://localhost:8080/feed/userPost";

  constructor() {
    this.reEvaluate();
  }

  ngOnInit(): void {
  }

  reEvaluate()
  {
    this.pageOptions = [
      this.currentPage-2,
      this.currentPage-1,
      this.currentPage,
      this.currentPage+1,
      this.currentPage+2
    ].filter(pageNumber => pageNumber>=1 && pageNumber <= this.totalPages);
  }

  onClick(currentPage:number)
  {
      this.currentPage = currentPage;
      this.currentChange.emit(this.currentPage);
      this.reEvaluate();
  }

  Next()
  {
    this.currentPage++;
    this.currentChange.emit(this.currentPage);
    this.reEvaluate();
  }

  Prev(){
    this.currentPage--;
    this.currentChange.emit(this.currentPage);
    this.reEvaluate();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'totalPages': {
            if(this.currentPage>1)
            {
            this.reEvaluate();
            this.currentPage--;
            this.currentChange.emit(this.currentPage);
            }
          }
        }
      }
    }
  }

  

}
