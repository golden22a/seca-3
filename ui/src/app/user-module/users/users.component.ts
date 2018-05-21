import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users:any;
  private firstName;
  private lastName;
  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.userService.allUsers().subscribe(res => this.users=res.json())
  }
  addUser(){
    if(this.firstName.length>0 && this.lastName.length >0)
    this.userService.addUser(this.firstName,this.lastName).subscribe(res=>{
      this.users.push(res.json());
      this.firstName="";
      this.lastName="";
    })
  }

}
