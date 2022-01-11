import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http : HttpClient) { }
  FetchBlog(){
    const blog = this._http.get('/blogs/fetch')
    return blog;
  } 
  blog (body:any){
    const PostData = new FormData();
    PostData.append("tblog" , body.tblog);
    PostData.append("blog" , body.blog);
    if(body.image)
    PostData.append("image" , body.image , body.tblog);
    console.log(PostData);
    return this._http.post('/user/blog',PostData);
  }
  deleteBlog(blog:any)
  {
    return this._http.put('/blogs/DeleteBlog',blog,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}

