import { Component, OnInit } from '@angular/core';
import { AlumniService } from '../services/alumni.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  allblogs: any =[] ;
  constructor(private _alumni:AlumniService) { }
 
  ngOnInit(): void {
     this.allblogss();
     
  }
  allblogss(){
    this._alumni.FetchBlog()
 .subscribe(
   data=>{this.allblogs = data},
   error=>{console.error(error)}
   
 )
  }
}
