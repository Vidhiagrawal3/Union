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
    const blog = this._http.get('http://127.0.0.1:3000/blogs/fetch')
    return blog;
  } 
  blog (body:any){
    const PostData = new FormData();
    PostData.append("tblog" , body.tblog);
    PostData.append("blog" , body.blog);
    PostData.append("image" , body.image , body.tblog);
    console.log(PostData);
    return this._http.post('http://127.0.0.1:3000/user/blog',PostData);
  }
  deleteBlog(blog:any)
  {
    return this._http.put(environment.BASE_URL + '/blogs/DeleteBlog',blog,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}

