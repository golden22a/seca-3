import { CurrentUserService } from './../current-user.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from '../user-module/users/users.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user=null;
  modal;
  firstName;
  lastName;
  password="";
constructor(private userService:UsersService,private modalService: NgbModal,private current:CurrentUserService) { 

}

ngOnInit() {
if(!this.user){
  this.user=this.current.getUser();
}
}

open(content) {
  this.firstName=this.user.firstName;
  this.lastName=this.user.lastName;
 this.modal=this.modalService.open(content);
}
updateUser(){
  this.userService.updateSelf(this.firstName,this.lastName,this.password).subscribe(res=>{
    this.user.firstName=this.firstName;
    this.user.lastName=this.lastName;
    this.modal.close();
      })
}

}
