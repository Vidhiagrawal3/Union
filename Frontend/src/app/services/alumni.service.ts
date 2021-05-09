import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private _http : HttpClient) { }
  register (body:any){
    return this._http.post('http://127.0.0.1:3000/user/register',body , {
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any){
    return this._http.post('http://127.0.0.1:3000/user/login',body , {
      observe:'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
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
