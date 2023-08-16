import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
 export class PermissionsService {

 constructor(private login:LoginService, private router:Router) { }

 canActivate(): boolean {
  if(this.login.isLoggedIn() && this.login.getUserRole()=='admin'){
    return true;
  }
  this.router.navigate(['login']);
  return false;
 }

 }
export const adminGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
  };
