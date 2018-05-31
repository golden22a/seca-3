import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../current-user.service';
import { RecordsService } from '../../records.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;
  temp:any;
  constructor(private current:CurrentUserService,private recordService:RecordsService) { }

  ngOnInit() {
    console.log("dashboard init");
    this.current.userChange.subscribe(data=>{
      this.temp=data;
      this.user=this.temp.user;
    })
    if(!this.user){
      console.log("getting user");
     this.user=this.current.getUser();
    }
  }


}
