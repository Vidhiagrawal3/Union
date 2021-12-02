import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin/services/admin.service';
import { AlumniService } from './services/alumni.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  adminStatus = false;
  constructor(private alumniService: AlumniService, private admin: AdminService ){}

  title = 'union';
  ngOnInit(){
    this.alumniService.autoAuthUser();
    this.adminStatus = this.admin.adminLoginStatus();
  }
}
