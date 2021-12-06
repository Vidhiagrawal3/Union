import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumniService } from 'src/app/services/alumni.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alumni-profile',
  templateUrl: './alumni-profile.component.html',
  styleUrls: ['./alumni-profile.component.css']
})
export class AlumniProfileComponent implements OnInit {

  public alumniId: any;

  constructor(private route: ActivatedRoute, private alumni: AlumniService,private _http : HttpClient) { }
  public resAlumni: any;
  async getdata()
  {
    this.alumniId = this.route.snapshot.params.id;
      const res = this._http.get<{data:any}>(environment.BASE_URL + '/user/AlumniById/'+ this.alumniId)
      res.subscribe(res=>{
        console.log(res)
        this.resAlumni = res;
      });
  }
  ngOnInit(): void {
    this.getdata();
  }

  

}
