import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ AlumniService} from '../services/alumni.service'
@Component({
  selector: 'app-alumni-home',
  templateUrl: './alumni-home.component.html',
  styleUrls: ['./alumni-home.component.css']
})
export class AlumniHomeComponent implements OnInit {
Username:String="";
  constructor(private _alumni :AlumniService, private _router:Router) {
    this._alumni.alumni()
    .subscribe(
      data=>this.addName(data),
      error=>{console.error(error), this._router.navigate(['/login'])}
      
    )
   }
   
addName(data)
{
this.Username = data.fname;
}


  ngOnInit(): void {
  }
 logout(){
   this._alumni.logout()
   .subscribe(
    data=>{console.log(data),this._router.navigate(['/login'])},
    error=>console.error(error) 
   )
 }
}
