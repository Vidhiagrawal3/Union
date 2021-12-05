import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumniService } from 'src/app/services/alumni.service';

@Component({
  selector: 'app-alumni-profile',
  templateUrl: './alumni-profile.component.html',
  styleUrls: ['./alumni-profile.component.css']
})
export class AlumniProfileComponent implements OnInit {

  public alumniId: any;

  constructor(private route: ActivatedRoute, private alumni: AlumniService) { }
  resAlumni: any;
   allAlumni: any=[];

  ngOnInit(): void {
    this.alumniId = this.route.snapshot.params.id;
    //this.resAlumni= this.alumni.getAlumniById(this.alumniId);
    console.log(this.resAlumni)
    // if(this.alumniId){

    //  this.alumni.FetchAlumni()
    //  .subscribe(
    //    data=>{this.allAlumni = data},
    //    error=>{console.error(error)}
    //     )
    
    //  this.resAlumni = this.allAlumni.find(obj => {
    //   return obj._id === this.alumniId 
    // })

    // console.log(this.resAlumni._id)
    // }
  }

  

}
