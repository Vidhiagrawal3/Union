import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin/services/admin.service';
import { AlumniService } from './services/alumni.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  adminStatus = "aaa";
  constructor(public router: Router,private alumniService: AlumniService, private admin: AdminService ){}

  title = 'union';
  getrole()
  {
    this.adminStatus = localStorage.getItem("Role");
    if(this.adminStatus == "Admin")
    return false
    else
    return true;
  }
  ngOnInit(){
    this.alumniService.autoAuthUser();
  }
}
