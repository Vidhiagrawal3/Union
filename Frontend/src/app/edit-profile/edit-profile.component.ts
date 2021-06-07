import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../services/alumni.service';
import csc from 'country-state-city'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 
  constructor(private _alumni:AlumniService , private _router:Router) {

   }
   fname:String = "";
   lname:String = "";
   email:String = "";
   course:String = "";
   branch:String = "";
   gyear:String = "";
   phone:String = "";
   roll:String = "";

  ngOnInit() {
   this.getData();
  }
  getData(){
    const UserData = this._alumni.getUserinfo()
    this.fname = UserData.fname;
    this.lname = UserData.lname;
    this.email = UserData.email;
    this.course = UserData.course;
    this.branch = UserData.branch;
    this.gyear = UserData.gyear;
    this.phone = UserData.phone;
    this.roll = UserData.roll;
  }
}
