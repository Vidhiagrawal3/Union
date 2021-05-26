import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{ AlumniService} from '../services/alumni.service';
@Component({
  selector: 'app-alumni-home',
  templateUrl: './alumni-home.component.html',
  styleUrls: ['./alumni-home.component.css']
})
export class AlumniHomeComponent implements OnInit {
  BlogForm : FormGroup = new FormGroup({
    tblog:new FormControl(null,[Validators.min(3),Validators.required]),
   blog:new FormControl(null ,[Validators.min(3),Validators.required]),
 })



fname:String="";
lname:String="";
course:String="";
branch:String="";
  constructor(private _alumni :AlumniService, private _router:Router) {
    this._alumni.alumni()
    .subscribe(
      data=>this.addName(data),
      error=>{console.error(error), this._router.navigate(['/login'])}
      
    )
   }
   
addName(data)
{
this.fname = data.fname;
this.lname = data.lname;
this.course = data.course;
this.branch = data.branch;
}

  ngOnInit(): void {
  }

 post(){
  if(!this.BlogForm.valid)
  console.log("Invalid Entry");
 this._alumni.blog(JSON.stringify(this.BlogForm.value))
 .subscribe(
   data => {console.log(data)},
   error => console.error(error)
 )
 }
}
