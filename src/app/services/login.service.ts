import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public loginStatusSubject=new Subject<boolean>();



  //current user: which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  //generate token
  public generateToken(loginData: any){
      return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user-sets the token in the local storage 
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  // to check that user is logged in or not 
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }
    else{
      return true;
    }
  }
// to remove the token from the localstorage
  public logOut(){
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     return true;
  }

  // to get the token from the localstorage
  public getToken(){
    return localStorage.getItem("token");
  }

  //set the userDetail in the localStorage

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }
// get the user from the localstorage
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

  //to get userRoles
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
