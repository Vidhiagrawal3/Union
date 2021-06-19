import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumniService } from '../services/alumni.service';
// import csc from 'country-state-city';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

   public userData: any;
   alumniId: any;
   public AtLeastOneExp: boolean = false;
   experienceForm : FormGroup;
   empList = [
     {value: "Internship"},
     {value: "Full-time"},
     {value: "Part-time"},
     {value: "Self Employed"},
     {value: "Trainee"},
     {value: "Freelance"}
   ];
 
  constructor(private alumniService:AlumniService , private _router:Router,
    private activatedRoute: ActivatedRoute) {

      // this.alumniId = this.activatedRoute.snapshot.paramMap.get('id');

   }
   fname:String = "";
   lname:String = "";
   email:String = "";
   course:String = "";
   branch:String = "";
   gyear:String = "";
   phone:String = "";
   roll:String = "";
   id: String = "";
   experienceList:any[] = [];

  ngOnInit() {
   this.getData();
   this.createExperienceForm();
  }


  getData(){
    this.userData = this.alumniService.getUserinfo()
    this.fname =this.userData.fname;
    this.lname = this.userData.lname;
    this.email = this.userData.email;
    this.course = this.userData.course;
    this.branch = this.userData.branch;
    this.gyear = this.userData.gyear;
    this.phone = this.userData.phone;
    this.roll = this.userData.roll;
    this.id = this.userData._id;
    this.experienceList = this.userData.experienceList;
  }

  createExperienceForm() {
    this.experienceForm = new FormGroup({
      title: new FormControl(null),
      emptype:new FormControl(null),
      company: new FormControl(null),
    })
  }

  addExperienceForm(){
     this.AtLeastOneExp = true;
    console.log(this.experienceForm);
    this.userData.experienceList.push(this.experienceForm.value);
    this.createExperienceForm();
    console.log(this.userData.experienceList);

  }

  saveProfile(){
    console.log(this.id);
    this.alumniService.updateProfile(this.id, this.userData)
    // .subscribe(
    //   data => {console.log(data)},
    //   error => console.error(error)
    //   )
    // .subscribe(() => {
    //   console.log('Data updated successfully!')
    //   // this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
    // }, (err) => {
    //   console.log(err);
    //  });
        
      
    //   )
    // this.getData();
  }

}
