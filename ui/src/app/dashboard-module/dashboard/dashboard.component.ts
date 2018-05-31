import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../current-user.service';
import { RecordsService } from '../../records.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user={

  };
  constructor(private current:CurrentUserService,private recordService:RecordsService) { }

  ngOnInit() {
    console.log("dashboard init");
    this.current.userChange.subscribe(data=>{
      this.user=data.user;
    })
    if(!this.user.firstName){
     this.user=this.current.getUser();
    }
  }
  call(){
    console.log("here");
    this.recordService.getAllSavedRecords().subscribe(res=>{
      console.log(res);
    })
  }

}
