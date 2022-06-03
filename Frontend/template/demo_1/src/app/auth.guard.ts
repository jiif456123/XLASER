import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UserAllService } from './citas/services/usersAll.service';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private userAllService: UserAllService, private router:Router){

  }

  canActivate():boolean{
    if(this.userAllService.loggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return;
  }

 
  
}
