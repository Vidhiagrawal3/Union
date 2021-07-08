import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumniService } from '../services/alumni.service';
import csc from 'country-state-city';
// import csc from 'country-state-city';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
   public currentid:any[];
   public userData: any;
   public countryList: any[];
   public stateList: any[];
   public cityList: any[];
   public address: boolean = false;
   public addressAdded: boolean = false;
   public AtLeastOneExp: boolean = false;
   public editExp: boolean = false;
   public index: number;
   PersonalDetailsForm: FormGroup;
   experienceForm : FormGroup;
   empList = ["Internship",
     "Full-time",
     "Part-time",
     "Self Employed",
     "Trainee",
     "Freelance"
   ];
 
  constructor(private alumniService:AlumniService , private _router:Router,
    private activatedRoute: ActivatedRoute) {

      // this.alumniId = this.activatedRoute.snapshot.paramMap.get('id');

   }
  //  userDetails: any;
  //  fname:String = "";
  //  lname:String = "";
  //  email:String = "";
  //  course:String = "";
  //  branch:String = "";
  //  gyear:String = "";
  //  phone:String = "";
  //  roll:String = "";
  //  id: String = "";
   experienceList:any[] = [];

  ngOnInit() {
   this.getData();
   this.createPersonalDetailsForm();
   this.allCountries();
   this.createExperienceForm();
    
   if(this.userData.experienceList.length !=0){
    this.AtLeastOneExp=true
    }
    if(this.userData.city != null){
      this.addressAdded = true;
    }
  }


  getData(){
    this.userData = this.alumniService.getUserinfo();
    // this.fname =this.userData.fname;
    // this.lname = this.userData.lname;
    // this.email = this.userData.email;
    // this.course = this.userData.course;
    // this.branch = this.userData.branch;
    // this.gyear = this.userData.gyear;
    // this.phone = this.userData.phone;
    // this.roll = this.userData.roll;
    // this.id = this.userData._id;
    this.experienceList = this.userData.experienceList;
  }
  
   allCountries(){
     this.countryList = csc.getAllCountries();
   }

   allStatesOfCountry(countryName: String){
     let countryCode = this.countryList.filter(ele =>{
       if(ele.name === countryName){
         return ele;
       }
     })[0].isoCode;
    this.stateList = csc.getStatesOfCountry(countryCode);
    
   }

   allCitiesOfState(stateName: string){
     let stateCode = this.stateList.filter(ele => {
       if(ele.name === stateName){
         return ele;
       }
     })[0].isoCode;
     let countryCode= this.stateList.filter(ele =>{
       if(ele.name === stateName){
         return ele;
       }
     })[0].countryCode;
     this.cityList = csc.getCitiesOfState(countryCode,stateCode)
   }
    
   addressEntered(){
     this.address = true;
   }

   createPersonalDetailsForm(){
     this.PersonalDetailsForm = new FormGroup({
       country: new FormControl(''),
       state: new FormControl(''),
       city: new FormControl('')
     })
   }

   addPersonalForm(){
     this.userData.country = this.PersonalDetailsForm.value.country;
     this.userData.state = this.PersonalDetailsForm.value.state;
     this.userData.city = this.PersonalDetailsForm.value.city;
     this.addressAdded = true;
     this.address = false;
    console.log(this.userData);
     this.saveProfile();
   }

   editAddress(){
    this.userData.country = this.PersonalDetailsForm.value.country;
    this.userData.state = this.PersonalDetailsForm.value.state;
    this.userData.city = this.PersonalDetailsForm.value.city;
    this.addressAdded = true;
    console.log(this.userData);
     this.saveProfile();
   }

  createExperienceForm() {
    this.experienceForm = new FormGroup({
      title: new FormControl(null),
      emptype:new FormControl(''),
      company: new FormControl(null),
    })
  }

  addExperienceForm(){
     this.AtLeastOneExp = true;
     this.editExp = true;
    console.log(this.experienceForm);
    this.userData.experienceList.push(this.experienceForm.value);
    this.createExperienceForm();
    console.log(this.userData.experienceList);
   
  }
  findindex(currentexp:any){
    this.currentid = currentexp;
    this.index = this.userData.experienceList.indexOf(this.currentid)
    
  }
  editsingleexp()
  {
    console.log(this.experienceForm.value);
    this.userData.experienceList[this.index] = this.experienceForm.value;
    this.saveProfile();
  }
  deleteexp()
  {
    this.userData.experienceList.splice(this.index ,1); 
    this.saveProfile();
  }
  saveProfile(){
    // console.log(this.id);
    this.alumniService.updateProfile(this.userData)
    .subscribe(
      data => {console.log(data)
      window.localStorage.setItem("UserData", JSON.stringify(data))},
      error => console.error(error)
      )
    
  }

}