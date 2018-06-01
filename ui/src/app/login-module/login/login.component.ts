import { CurrentUserService } from './../../current-user.service';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username="";
  password="";
  error={
    username:"",
    password:'',
    message:''
  }


  constructor(private loginService:LoginService
  ,private router:Router,private current:CurrentUserService
  
  ) { }

  ngOnInit() {
  }
  verify(){
    let check=true;
    if(this.username.length == 0){
      this.error.username = "please provide a username";
      check=false;
    
    }
    if(this.password.length == 0 ){
      this.error.password = "please provide a password";
      check=false;
    }
    return check;
  }
  login(){
    console.log("heeere");
    if(this.verify()){
    let user={
      "username":this.username,
      "password":this.password
    }
    this.loginService.login(user).subscribe(res=>{
      localStorage.setItem("Authorization",res['Authorization']);
      this.current.loggedin();
    },err=>{
      this.error.message = "Username or Password incorrect";
       })
  }
  }
  focused(input){
    console.log(input);
    this.error[input]='';
    this.error.message='';
  }
}
