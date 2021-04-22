import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private _http : HttpClient) { }
  register (body:any){
    return this._http.post('http://127.0.0.1:3000/alumni/register',body , {
      observe:'response',
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }
}
