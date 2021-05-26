import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlumniService } from "./alumni.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private _alumni:AlumniService){}
    intercept(req:HttpRequest<any> , next: HttpHandler){
        const token = this._alumni.getToken();
        const request = req.clone({
            headers:req.headers.set('Authorization' ,"Bearer "+ token)
        });
        return next.handle(request);
    }
}