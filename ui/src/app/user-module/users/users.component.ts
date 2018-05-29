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
   firstName;
   lastName;
   user;
  constructor(private userService:UsersService,private current:CurrentUserService) { 
this.user={
  "firstName":""
};
  }

  ngOnInit() {
  this.current.userChange.subscribe(data=>{
     this.user=data.user;

   });
   console.log(this.user);
  }
  addUser(){
    if(this.firstName.length>0 && this.lastName.length >0)
    this.userService.addUser(this.firstName,this.lastName).subscribe(res=>{
      this.users.push(res);
      this.firstName="";
      this.lastName="";
    })
  }

}
