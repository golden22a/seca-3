import { CurrentUserService } from './../../current-user.service';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../current-user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;


  constructor(private loginService:LoginService
  ,private router:Router,private current:CurrentUserService
  
  ) { }

  ngOnInit() {
  }
  login(){
    let user={
      "username":this.username,
      "password":this.password
    }
    this.loginService.login(user).subscribe(res=>{
      localStorage.setItem("Authorization",res['Authorization']);
      this.current.loggedin();
    })
  }

}
