import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AlumniService } from '../services/alumni.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null, Validators.required)
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
     this._alumniService.login(JSON.stringify(this.loginForm.value))
     .subscribe(
       data=>{console.log(data);this._router.navigate(['/alumni-home']);},
       error=>console.log(error)
     )
  }

}
