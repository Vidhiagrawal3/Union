import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ AlumniService} from '../services/alumni.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-alumni-home',
  templateUrl: './alumni-home.component.html',
  styleUrls: ['./alumni-home.component.css']
})
export class AlumniHomeComponent implements OnInit {
fname:String="";
lname:String="";
gyear:BigInteger;
id:String="";
roll:BigInteger;
pass:String="";
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
this.roll = data.roll;
this.pass = data.pass;
this.gyear = data.gyear;
this.id = data._id;
}
 headers= new HttpHeaders() 
.set('fname','fname')
.set('lname','lname')
.set('id','id')

BlogForm : FormGroup = new FormGroup({
  btitle:new FormControl(null,[Validators.min(3),Validators.required]),
  bblog:new FormControl(null,[Validators.min(3),Validators.required]),
})

  ngOnInit(): void {
  }
 logout(){
   this._alumni.logout()
   .subscribe(
    data=>{console.log(data),this._router.navigate(['/login'])},
    error=>console.error(error) 
   )
 }
}
