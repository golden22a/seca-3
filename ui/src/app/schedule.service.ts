import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  temp:any;
  token;
  constructor(private http:HttpClient,private currentUSer:CurrentUserService) { 
    this.currentUSer.userChange.subscribe(data =>{
      this.temp=data;
      this.token=this.temp.token
      this.temp=null;
    })
    if(!this.token){
      this.token=this.currentUSer.getToken();
    }
  }

  add(record){
    return this.http.post(`${environment.apiHost}/api/schedule/?Authorization=${this.token}`,{
      "userId":record.id
    })
  }


}
