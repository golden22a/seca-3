import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user;
  token;
  userChange= new Subject();
  constructor(private http:HttpClient,private route:Router) {
    
   this.token = localStorage.getItem('Authorization');
   console.log(this.token);
   if(this.token)
   this.http.get(`${environment.apiHost}/api/users/?Authorization=${this.token}`).subscribe(res=>{
     this.user=res;
     this.userChange.next({"user":this.user,"token":this.token});
    
   },err=>{
     localStorage.removeItem('Authorization');
     this.route.navigate(['/login']);
   });
   }
   getToken(){
     return this.token;
   }
}
