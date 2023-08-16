import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData={
    userName:'',
    password:''
  }
  
  
  constructor(private snack:MatSnackBar, private login:LoginService ,private router: Router) {}

  formSubmit(){
    console.log("login button clicked");
    if(this.loginData.userName.trim()=='' || this.loginData.userName==null){
      this.snack.open("UserName is required!",'',{
        duration:3000,
        verticalPosition:'top',
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("password is required!",'',{
        duration:3000,
        verticalPosition:'top',
      });
      return;
    }
    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        console.log("Success");

        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect  ... if ADMIN move to admin dashboard
            //redirect ..... if NORMAL move to normal user dashboard
            if(this.login.getUserRole()=="admin"){ // note please change it to "Admin in the backend"
              this.router.navigate(['admin']); 
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=="Normal"){
              this.router.navigate(['user']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logOut();
             }
            
          },(error)=>{
            console.log(error);
          }
        );

      },(error)=>{
        console.log("Error");
        console.log(error);
        this.snack.open("Invalid Details: Try again!!",'',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );

  }
}
