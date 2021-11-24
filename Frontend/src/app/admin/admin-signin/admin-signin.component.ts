import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    passcode: new FormControl(null, [Validators.required])
  })
  constructor(private _admin: AdminService, private _router: Router) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginForm.valid){
      alert('Invalid Code!')
    }
    else{
      this._admin.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        token=>{console.log(token),this._router.navigate(['admin/requests'])},
       error=>console.log(error)
      )
    }
    
  }

}
