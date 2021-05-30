import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  allblogs: any =[] ;
  constructor(private _alumni:BlogService) { }
 
  ngOnInit(): void {
     this.allblogscall();
     
  }
  allblogscall(){
    this._alumni.FetchBlog()
 .subscribe(
   data=>{this.allblogs = data},
   error=>{console.error(error)}
   
 )
  }
}
