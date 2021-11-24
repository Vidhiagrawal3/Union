import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  login(body: any){
    console.log(body)
    const res = this._http.post<{token: string}>(environment.BASE_URL + '/admin/login',body , {
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    // res.subscribe(res=>{

    //   this.token=res.token;
    //   this.isAuthenticated = true;
    //   this.authStatusListener.next(true);
    //   this.saveAuthData(this.token);
     //})
    return res
  }

  SetVerified(user:any)
  {
    console.log("HUIHI")
    return this._http.put(environment.BASE_URL+ '/admin/verified',user,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  deleteUser(user:any)
  {
    return this._http.put(environment.BASE_URL + '/admin/DeleteProfle',user,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

}
