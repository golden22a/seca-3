import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../current-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName="";
  lastName="";
  username="";
  password="";
  confirmPassword="";
  error={
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    confirmPassword:'',
    message:''
  }
  constructor(private signupService:SignupService
  ,private router:Router
  
  ) { }

  ngOnInit() {
  }
  verify(){
    let check =true;
    if(this.username.length == 0){
      this.error.username="username required";
      check= false;
    }
    if(this.password.length == 0){
      this.error.password="password required";
      check= false;
      
    }
    if(this.firstName.length == 0){
      this.error.firstName="first name required";
      check= false;
    }
    if(this.lastName.length == 0){
      this.error.lastName="last name required";
      check= false;
    }
    if(this.confirmPassword != this.password){
      this.error.confirmPassword="password doesn't match";
      check= false;

    }
    return check;
  }
  focused(input){
    this.error[input]="";
  }
  signup(){
    if(this.verify()){
    let user={
      "firstName":this.firstName,
      "lastName":this.lastName,
      "username":this.username,
      "password":this.password
    }
    this.signupService.signup(user).subscribe(res=>{
      localStorage.setItem("Authorization",res['Authorization']);
      this.router.navigate(["/dashboard"]);
    },err=>{
      this.error.message="Error username already exists";
    })
  }
}

}
