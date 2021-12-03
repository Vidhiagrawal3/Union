import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //  isLoading = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(private _router: Router, private _alumniService: AlumniService) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid Login Details');
      return;
    }

    // console.log(JSON.stringify(this.loginForm.value));

    //  this.isLoading = true;
     this._alumniService.login(JSON.stringify(this.loginForm.value))
     .subscribe(
       token=>{console.log(token),this._router.navigate(['/home'])},
       error=>console.log(error)
     )
  }

}
