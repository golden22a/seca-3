import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  token;
  constructor(private http:HttpClient,private currentUSer:CurrentUserService) { 
    this.currentUSer.userChange.subscribe(data => this.token=data.token)
  }

  add(record){
    return this.http.post(`${environment.apiHost}/api/schedule/?Authorization=${this.token}`,{
      "userId":record.id
    })
  }


}
