import { environment } from './../environments/environment';
import { CurrentUserService } from './current-user.service';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {mergeMap} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  token;
  gotToken = new Subject();
  records;
  recordLst = new Subject();
  constructor(private http: HttpClient,private currentUSer:CurrentUserService) { 
    this.currentUSer.userChange.subscribe(data => {
      console.log("heere");
      this.token=data.token
    this.gotToken.next(this.token);
    })
    if(!this.token){
      this.token=this.currentUSer.getToken();
      this.gotToken.next(this.token);
    }

  }

  getAllPublicHearings(){
    var today = new Date();
    return this.http.get(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=type_of_notice_description in('Public Hearings','Meeting') and end_date >= '${today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()}'`);
  }
  
  

  add(record){
    return this.http.post(`${environment.apiHost}/api/schedule/?Authorization=${this.token}`,{
      "recordId":record.request_id
    })
}
 getAllSavedRecords(){

  let ids="(";
  console.log("Now here");
  console.log(this.token);
  if(!this.token){
  this.gotToken.subscribe(data => {
    this.http.get(`${environment.apiHost}/api/schedule/?Authorization=${this.token}`).subscribe(res=>{
      if(res.length>0){
      for(let i=0;i<res.length;i++){
        if(i==res.length-1){
        ids+=""+res[i].recordId+")"
        break;
        }
        ids+=""+res[i].recordId+","
      }
      
      this.getAllInfo(ids);
    }
    })
  })
  }else{
    this.http.get(`${environment.apiHost}/api/schedule/?Authorization=${this.token}`).subscribe(res=>{
      if(res.length>0){
      for(let i=0;i<res.length;i++){
        if(i==res.length-1){
        ids+=""+res[i].recordId+")"
        break;
        }
        ids+=""+res[i].recordId+","
      }
      
      this.getAllInfo(ids);
    }
    })
  }
 
}
getAllInfo(ids){
  console.log('waaaw')
 this.http.get(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=request_id in ${ids}`).subscribe(res=>{
  this.recordLst.next(res);
 })
}
delete(id){
  return this.http.delete(`${environment.apiHost}/api/schedule/${id}/?Authorization=${this.token}`)
}
}
