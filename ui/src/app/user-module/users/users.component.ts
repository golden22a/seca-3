import { CurrentUserService } from './../../current-user.service';
import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   users:any;
   user;
   firstName;
   lastName;
   username;
   password;
   role="USER";
  constructor(private userService:UsersService,private current:CurrentUserService) { 
this.user={
  
};
this.current.userChange.subscribe(data=>{
  this.user=data.user;
  })
}
ngOnInit(){
  if(!this.user.firstName){
   this.user=this.current.getUser();
  }
  this.userService.allUsers().subscribe(res=>this.users=res)
}
   
  addUser(){
    if(this.firstName.length>0 && this.lastName.length >0)
    this.userService.addUser(this.firstName,this.lastName,this.username,this.password,this.role).subscribe(res=>{
      this.users.push(res);
      this.firstName="";
      this.lastName="";
      this.username="";
      this.role="USER";
      this.password="";
    })
    
  }
  x(a){
    console.log(a);
  }
}
