import { Component, OnInit } from '@angular/core';
import { AlumniService } from './services/alumni.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private alumniService: AlumniService ){}

  title = 'union';
  ngOnInit(){
    this.alumniService.autoAuthUser();
  }
}
