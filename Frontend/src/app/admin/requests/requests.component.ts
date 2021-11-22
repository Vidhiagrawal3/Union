import { Component, OnInit } from '@angular/core';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
   alluser: any=[];
   userData: any;
    constructor(private _alumni: AlumniService) {

    }

    ngOnInit(){
    this.All_AlumniData();
    }
    
 
    All_AlumniData(){
    this._alumni.FetchAlumni()
    .subscribe(
      data=>{this.alluser = data},
      error=>{console.error(console.error()
      )}
     )
    }

   acceptVerify(){
    // this.userData = this._alumni;
    //  console.log(this.userData)
    // this._alumni.verify(this.userData)
    // .subscribe(
    //   data => {
    //     window.localStorage.setItem("UserData", JSON.stringify(data))
    //   },
    //   error => console.error(error)
    // )
   }
}
