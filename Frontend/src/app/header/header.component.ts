import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { AlumniService } from '../services/alumni.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private _alumni: AlumniService, private router: Router) { }

  ngOnInit() {
    this.authListenerSubs = this._alumni
    .getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout(){
    this._alumni.logout();
  
      this.router.navigate(['/login'])
  }

  //  onlogout(){
//    this._alumni.logout()
//    .subscribe(
//     data=>{console.log(data),this._router.navigate(['/login'])},
//     error=>console.error(error) 
//    )
//  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
