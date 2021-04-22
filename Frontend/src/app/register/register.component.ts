import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumniService } from 'src/assets/services/alumni.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  courseSelected ="";
  registerForm : FormGroup = new FormGroup({
     fname:new FormControl(null,[Validators.min(3),Validators.required]),
    lname:new FormControl(null),
    email:new FormControl(null,[Validators.email,Validators.required]),
   roll: new FormControl(null , [Validators.required]),
    course:new FormControl(null,[Validators.required]),
    stream: new FormControl(null),
    gyear: new FormControl(null, [Validators.required]),
    phone: new FormControl(null , [Validators.required]),
    password: new FormControl(null , [Validators.min(3),Validators.required]),


  })
  
  courseList =[
    {value:"B-Tech"},
    {value:"BCA"},
    {value:"BBA"},
    {value:"M-Tech"},
    {value:"MBA"},
    {value:"MCA"},
  ];
  StreamList =[
    {value:"CSE"},
    {value:"ME"},
    {value:"IT" },
    {value:"CIVIL" },
    {value:"EEE" },
    {value:"ECE" },
  ];

  constructor(private reoter:Router , private _alumniService:AlumniService) { }

  ngOnInit(): void {
  }
  register(){
    if(!this.registerForm.valid)
    console.log("Invalid Entry");
   this._alumniService.register(JSON.stringify(this.registerForm.value))
   .subscribe(
     data => {console.log(data)},
     error => console.error(error)
     
   )
    // console.log(JSON.stringify(  this.registerForm.value));
  }

}
