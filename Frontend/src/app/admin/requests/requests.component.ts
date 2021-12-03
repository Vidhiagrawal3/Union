import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumniService } from '../../services/alumni.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
   alluser: any=[];
   userData: any;
    constructor(private _alumni: AlumniService, private _router:Router, private admin: AdminService) {}

    ngOnInit(){
    this.checkToken();
    this.All_AlumniData();
    }
    checkToken()
    {
      const token =localStorage.getItem("token");
      if( token != "secret_this_should_be_longer")
      {
         alert("Please Enter The Key") 
         this._router.navigate(['adminsignin'])
      }
     
    }
    All_AlumniData(){
    this._alumni.FetchAlumni()
    .subscribe(
      data=>{this.alluser = data},
      error=>{console.error(console.error()
        )}
     )}

   acceptVerify(user:any){
    console.log(user)
    this.admin.SetVerified(user)
    .subscribe(
      data => {console.log(data) , this.All_AlumniData()
      window.localStorage.setItem("UserData", JSON.stringify(data))},
      error => console.error(error)
      );
   }
   deleteUser(user:any){
    console.log(user)
    this.admin.deleteUser(user)
    .subscribe(
      data => {console.log(data) , this.All_AlumniData()},
      error => console.error(error)
      )
    }
}
