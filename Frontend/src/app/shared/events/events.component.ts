import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  EventForm : FormGroup = new FormGroup({
    etitle:new FormControl(null,[Validators.min(3),Validators.required]),
    eDiscription:new FormControl(null ,[Validators.min(3),Validators.required]),
   date:new FormControl(null)
 })
  constructor(private _event : EventsService) { }
  allevents:any=[];
  post(){
    if(!this.EventForm.valid)
    console.log("Invalid Entry");
    console.log(this.EventForm.value);
   this._event.event(this.EventForm.value)
   .subscribe(
     data => {console.log(data),this.fetchevents() },
     error => console.error(error)
   )
   }
   fetchevents()
   {
     this._event.Fetchevents()
     .subscribe(
       data=>{this.allevents = data},
      error=>{console.error(error)}
       
     )
       
     
   }
   getrole()
  {
     
    if(localStorage.getItem("Role") == "Admin")
    return true
    else
    return false;
  }
  ngOnInit(): void {
    this.fetchevents()
    
  }

}
