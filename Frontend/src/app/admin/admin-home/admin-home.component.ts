import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private _router: Router) { }
  logout()
  {
    localStorage.clear();
    this._router.navigate(['adminsignin'])
  }
  ngOnInit(): void {
  }

}
