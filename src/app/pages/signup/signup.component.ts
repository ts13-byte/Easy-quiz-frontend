import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

constructor(private userService: UserService,private snack:MatSnackBar){}

public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    enabled:'',
    image:''

}
ngOnInit():void {}
formSubmit(){
  console.log(this.user);
  if(this.user.userName=='' || this.user.userName==null){
    this.snack.open("UserName is required","OK",{
      duration:3000,
      verticalPosition:'top',
     
    });
    return;
  }
  //addUser: userService
  this.userService.addUser(this.user).subscribe(
    (data:any)=>{
        //success
        console.log(data);
        Swal.fire('Registeration complete!!','User id is : '+data.id,'success');
    },
    (error)=>{
        //error
        console.log(error);
        this.snack.open('something went wrong','',{
          duration:3000,
          verticalPosition:'top',
        });
    }
  )
}

}
