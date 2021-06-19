import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumniService } from 'src/app/services/alumni.service';
import { mimeType } from '../validators/mime-type.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  // public myFiles: string[] = [];
  // urlArray:any=[];
  courseSelected ="";
  registerForm : FormGroup = new FormGroup({
     fname:new FormControl(null,[Validators.min(3),Validators.required]),
    lname:new FormControl(null),
    email:new FormControl(null,[Validators.email,Validators.required]),
   roll: new FormControl(null , [Validators.required]),
    course:new FormControl(null,[Validators.required]),
    branch: new FormControl(null),
    gyear: new FormControl(null, [Validators.required]),
    phone: new FormControl(null , [Validators.required]),
    password: new FormControl(null , [Validators.min(3),Validators.required]),
    photo: new FormControl(null, {
      asyncValidators: [mimeType]
    }),
    // experienceList: {
    //   company: new FormControl(null),
    //   title: new FormControl(null),
    //   emptype: new FormControl(null)
    //   }

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
  //image preview property
  imgPreview: string;

  constructor(private router:Router , private _alumniService:AlumniService) { }

  ngOnInit(): void {
  }

  // imagePicked(event) {
  //   this.myFiles=[];
  //   for (var i = 0; i < event.target.files.length; i++) { 
  //     this.myFiles.push(event.target.files[i]);
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[i]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.urlArray.push(reader.result);
  //       this.imgPreview = reader.result as string;
  //     }
  //   }
  // }

  
  imagePicked(event :  Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({photo: file});
    this.registerForm.get('photo').updateValueAndValidity();
    console.log(file);
    console.log(this.registerForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  register(){
    if(!this.registerForm.valid){
      console.log("Invalid Entry");
    }
    else{
       this.isLoading = true;
    }
     
    this._alumniService.register(JSON.stringify(this.registerForm.value))
   .subscribe(
     data => {console.log(data)},
     error => console.error(error)
     
     )
    
    // console.log(JSON.stringify(  this.registerForm.value));
  }

}
