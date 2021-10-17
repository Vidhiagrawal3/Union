import { Component, OnInit } from '@angular/core';
import { AlumniService } from '../services/alumni.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-search-alumni',
  templateUrl: './search-alumni.component.html',
  styleUrls: ['./search-alumni.component.css']
})
export class SearchAlumniComponent implements OnInit {
  
 alluser: any=[];
 searchName:string = "";
 searchCourse:string = "";
 searchStream:string = "";
 searchYear:string="20";
 courseList =[
    {value:"B-Tech"},
    {value:"BCA"},
    {value:"BBA"},
    {value:"M-Tech"},
    {value:"MBA"},
    {value:"MCA"},
  ];
  streamList =[
    {value:"CSE"},
    {value:"ME"},
    {value:"EEE"},
    {value:"ECE"},
    {value:"CIVIL"},
    {value:"IT"},
  ];

 constructor(private _alumni:AlumniService) {
  
   }

  ngOnInit(): void {
    this.allalumnicall();
   
  }



  allalumnicall(){
    this._alumni.FetchAlumni()
 .subscribe(
   data=>{this.alluser = data},
   error=>{console.error(error)}
   
 )
  }
  
}
