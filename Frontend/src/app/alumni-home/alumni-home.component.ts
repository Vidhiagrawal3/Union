import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ AlumniService} from '../services/alumni.service';
import { BlogService } from '../services/blog.service';
@Component({
  selector: 'app-alumni-home',
  templateUrl: './alumni-home.component.html',
  styleUrls: ['./alumni-home.component.css']
})
export class AlumniHomeComponent implements OnInit {
 

fname:String="";
lname:String="";
course:String="";
branch:String="";
  constructor(private _alumni :AlumniService, private _router:Router, private _blog :BlogService) {
    
   }
   GetDataFromAPI()
   {
     this._alumni.alumni()
    .subscribe(
      data=>this.addName(data),
      error=>{console.error(error), this._router.navigate(['/login'])}
      
    )
   }
addName(data)
{
this.fname = data.fname;
this.lname = data.lname;
this.course = data.course;
this.branch = data.branch;
}

  ngOnInit(): void {
    this.GetDataFromAPI();
  }


}
