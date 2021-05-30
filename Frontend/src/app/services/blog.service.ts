import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http : HttpClient) { }
  FetchBlog(){
    const blog = this._http.get('http://127.0.0.1:3000/user/fetch')
    return blog;
  } 
  blog (body:any){
    console.log(body)
    return this._http.post('http://127.0.0.1:3000/user/blog',body , {
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
