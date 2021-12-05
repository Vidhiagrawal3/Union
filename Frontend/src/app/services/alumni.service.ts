import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
// import { catchError, map } from 'rxjs/operators';
import {Subject,Observable, throwError} from 'rxjs'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AlumniService {
  private isAuthenticated = false;
private token:string;
private tokenTimer: any;
private authStatusListener = new Subject<boolean>();
 private UserData:any;

//  REST_API: string = 'http://127.0.0.1:3000';

constructor(private _http : HttpClient) { }
 
  getToken(){
  return this.token;
  }
  settoken(token:any)
  {
    this.token = token
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
    console.log(body);
    return this._http.post(environment.BASE_URL + '/user/register',body , {
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


   //Edit profile
  updateProfile(body: any){
    console.log(body.experienceList);
    // console.log(id);
    return this._http.put(environment.BASE_URL + '/user/user/profile',body,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

    // let API_URL = `${this.REST_API}/user/${id}`;
    // return this._http.put(API_URL, body, { headers: this.httpHeaders })
    //   .pipe(
    //     catchError(this.handleError)
    //   )

  }
  

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  login(body: any){
    console.log(body);
    const res = this._http.post<{token:string, expiresIn : number}>(environment.BASE_URL + '/user/login',body , {
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
      this.alumni();
    })
    return res
  }

  alumni(){
   this.UserData=this._http.get<{data:any}>(environment.BASE_URL + '/user/alumni',{
     
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
    const alumni = this._http.get(environment.BASE_URL + '/user/search-alumni')
    return alumni;
  }
// getAlumniById(uid:any){
// {
//   const res = this._http.put(environment.BASE_URL + '/user/AlumniById',uid, {
     
//     observe:'body',
//     withCredentials: true,
//     headers: new HttpHeaders().append('Content-Type', 'application/json')
//   })
//   return JSON.stringify(res);
// }
// }


}

