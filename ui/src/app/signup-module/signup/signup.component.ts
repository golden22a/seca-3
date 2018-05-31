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
  firstName;
  lastName;
  username;
  password;
  confirmPassword;

  constructor(private signupService:SignupService
  ,private router:Router
  
  ) { }

  ngOnInit() {
  }
  signup(){
    let user={
      "firstName":this.firstName,
      "lastName":this.lastName,
      "username":this.username,
      "password":this.password
    }
    this.signupService.signup(user).subscribe(res=>{
      localStorage.setItem("Authorization",res['Authorization']);
      this.router.navigate(["/dashboard"]);
    })
  }

}
