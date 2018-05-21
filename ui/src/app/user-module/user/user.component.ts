import { UsersService } from '../../users.service';
import { Component, OnInit,Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input('user')
   user: any;
   private modal;
   private firstName;
   private lastName;
  constructor(private userService:UsersService,private modalService: NgbModal) { }

  ngOnInit() {

  }
  deleteUser(){
    this.userService.deleteUser(this.user.id).subscribe(res=>this.user=null);
  }
  open(content) {
    this.firstName=this.user.firstName;
    this.lastName=this.user.lastName;
   this.modal=this.modalService.open(content);
  }
  updateUser(){
    this.userService.updateUser(this.user.id,this.firstName,this.lastName).subscribe(res=>{
      this.user.firstName=this.firstName;
      this.user.lastName=this.lastName;
      this.modal.close();
        })
  }

}
