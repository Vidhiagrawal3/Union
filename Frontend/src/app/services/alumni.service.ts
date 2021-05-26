import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {
private token:string;
private authStatusListener = new Subject<boolean>();

constructor(private _http : HttpClient) { }

  getToken(){
  return this.token;
  }
  
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  register (body:any){
    return this._http.post('http://127.0.0.1:3000/user/register',body , {
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any){
    console.log(body);
    const res = this._http.post<{token:string}>('http://127.0.0.1:3000/user/login',body , {
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    res.subscribe(res=>{
      this.token=res.token;
      this.authStatusListener.next(true);
    })
    return res
  }
  alumni(){
    return this._http.get('http://127.0.0.1:3000/user/alumni',{
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  });
  } 
  logout(){
    return this._http.get('http://127.0.0.1:3000/user/logout',{
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-Type', 'application/json')});
  }
}