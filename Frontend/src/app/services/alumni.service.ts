import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class AlumniService {
  private isAuthenticated = false;
private token:string;
private tokenTimer: any;
private authStatusListener = new Subject<boolean>();
 private UserData:any;
constructor(private _http : HttpClient) { }
 
  getToken(){
  return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }
  
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  // saving user details in local storage
  saveUserInfo(Userdata:any){
    Userdata.subscribe(
      data=>{localStorage.setItem("UserData", JSON.stringify(data))}
    )
    
  }
  getUserinfo(){
    this.UserData = localStorage.getItem("UserData")
    return JSON.parse(this.UserData);
  }
  register (body:any){
    return this._http.post('http://127.0.0.1:3000/user/register',body , {
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any){
    console.log(body);
    const res = this._http.post<{token:string, expiresIn : number}>('http://127.0.0.1:3000/user/login',body , {
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    res.subscribe(res=>{

      this.token=res.token;
      const expiresInDuration = res.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      console.log(expirationDate);
      this.saveAuthData(this.token ,expirationDate);
    })
    return res
  }

  alumni(){
   this.UserData=this._http.get<{data:any}>('http://127.0.0.1:3000/user/alumni',{
     
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  })
  
    this.saveUserInfo(this.UserData); 
    return this.UserData
  } 

  // User is logged in automatically even if app is reloaded as soon as expiry duration lasts
  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return;
    }
    console.log(authInfo);
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();

    if(expiresIn){
      this.token = authInfo.token;
      this.isAuthenticated = true;
      // Since the authTimer works with seconds
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
   this.token = null;
   this.authStatusListener.next(false);
   clearTimeout(this.tokenTimer);
   this.clearAuthData();
  }

  // Reflecting token expiration in UI, logging user out in 2 hours
  setAuthTimer(expiresInDuration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
  }

  // Saving token and expiration date and time in local storage of Browser, 
  // So that user doesn't get logged out on reload
  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  //Removing the token and expiration date-time from local storage,
  //This method is called while logging out
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("UserData");
  }

  //accessing the token and expiration dt from local storage
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
  FetchAlumni(){
    const alumni = this._http.get('http://127.0.0.1:3000/user/search-alumni')
    return alumni;
  }
}
