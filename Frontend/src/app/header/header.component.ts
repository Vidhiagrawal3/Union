import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private alumniService: AlumniService) { }

  ngOnInit() {
    this.authListenerSubs = this.alumniService
    .getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
