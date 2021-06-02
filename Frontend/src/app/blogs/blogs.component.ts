import { Component, OnInit } from '@angular/core';
import { AlumniService } from '../services/alumni.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  BlogForm : FormGroup = new FormGroup({
    tblog:new FormControl(null,[Validators.min(3),Validators.required]),
   blog:new FormControl(null ,[Validators.min(3),Validators.required]),
 })

  allblogs: any =[] ;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription; 
  constructor(private _blogging:BlogService, private alumni: AlumniService) { }
 
  ngOnInit(): void {
     this.allblogscall();
      this.userIsAuthenticated = this.alumni.getIsAuth();
    this.authListenerSubs = this.alumni
    .getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }


  post(){
    if(!this.BlogForm.valid)
    console.log("Invalid Entry");
   this._blogging.blog(JSON.stringify(this.BlogForm.value))
   .subscribe(
     data => {console.log(data)},
     error => console.error(error)
   )
   }

  allblogscall(){
    this._blogging.FetchBlog()
 .subscribe(
   data=>{this.allblogs = data},
   error=>{console.error(error)}
   
 )
  }
}
