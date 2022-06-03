import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { UserAllService } from "./usersAll.service";
@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor{
    constructor( private userAllService:UserAllService){

    }
    intercept(req, next){
       /* console.log("HOLA");
        console.log(localStorage.getItem('token'));
           console.log(this.userAllService.getToken());*/

       
        const tokenizeReq = req.clone({
            setHeaders:{
                Authorization:`Bearer ${localStorage.getItem('token')}`//,
               // holasoy: this.userAllService.getToken()
            }
        })
        
        return next.handle(tokenizeReq);
    
    }
    

    
}