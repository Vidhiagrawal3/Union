import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../services/alumni.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
 
  constructor(private _alumni:AlumniService , private _router:Router) {

   }

  ngOnInit() {
   this.check();
  }
  check(){
     const UserData = this._alumni.getUserinfo()
    console.log(UserData)
  }
}
