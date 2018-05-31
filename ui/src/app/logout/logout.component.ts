import { CurrentUserService } from './../current-user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private currentUser:CurrentUserService) { }

  ngOnInit() {
    this.currentUser.logout();
  }

}
