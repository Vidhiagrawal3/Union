import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _http : HttpClient) { }
  event(body:any){
    return this._http.post('http://127.0.0.1:3000/user/EventPost',body);
  }
  Fetchevents(){
    const event = this._http.get('http://127.0.0.1:3000/user/AllEvents')
    return event;
  } 
}
