import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
   alluser: any=[];
   userData: any;
    constructor(private _alumni: AlumniService, private admin: AdminService) {}

    ngOnInit(){
    this.All_AlumniData();
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
