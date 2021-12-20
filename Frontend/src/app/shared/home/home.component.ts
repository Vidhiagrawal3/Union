import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _blogging:BlogService, private _event: EventsService) { }

  allblogs: any =[] ;
  allevents:any=[];

  ngOnInit(): void {
    this.allblogscall();
    this.fetchevents();
  }

  allblogscall(){
    this._blogging.FetchBlog()
 .subscribe(
   data=>{this.allblogs = data},
   error=>{console.error(error)}
     )}

  fetchevents(){
     this._event.Fetchevents()
     .subscribe(
       data=>{this.allevents = data},
      error=>{console.error(error)}
     )}



}
