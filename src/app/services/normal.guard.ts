import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
 export class PermissionsService {

 constructor(private login:LoginService, private router:Router) { }

 canActivate(): boolean {
  if(this.login.isLoggedIn() && this.login.getUserRole()=='Normal'){// note please change it to "Admin" at backend then change here
    return true;
  }
  this.router.navigate(['login']);
  return false;
 }

 }
export const normalGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
