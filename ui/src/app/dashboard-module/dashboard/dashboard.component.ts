import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../current-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user={
    firstName:'',
    lastName:''
  }
  constructor(private current:CurrentUserService) { }

  ngOnInit() {
    this.current.userChange.subscribe(data=>{
      this.user=data.user;
    })
  }

}
