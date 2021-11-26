import { Component, OnInit } from '@angular/core';
import { AlumniService } from '../../services/alumni.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
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
   image:new FormControl(null , [Validators.required])
 })

  allblogs: any =[] ;
  userIsAuthenticated = false;
  ImageURL: string;
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

  OnImagePick(event:Event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.BlogForm.patchValue({image:file});
    this.BlogForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
     this.ImageURL= reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  post(){
    if(!this.BlogForm.valid)
    console.log("Invalid Entry");
    console.log(this.BlogForm.value);
   this._blogging.blog(this.BlogForm.value)
   .subscribe(
     data => {console.log(data),this.allblogscall(); },
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
