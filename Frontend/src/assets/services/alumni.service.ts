import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private _http : HttpClient) { }
  register (body:any){
    return this._http.post('http://127.0.0.1:3000/user/register',body , {
      observe:'response',
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  login(body: any){
    return this._http.post('http://127.0.0.1:3000/user/login',body , {
      observe:'response',
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
}
