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
    console.log('getting auth');
   this.token = localStorage.getItem('Authorization');
   console.log(this.token);
   if(this.token)
   this.http.get(`${environment.apiHost}/api/users/?Authorization=${this.token}`).subscribe(res=>{
     this.user=res;
     console.log(this.user);
     this.userChange.next({"user":this.user,"token":this.token});
    if(this.user.role == "ADMIN"){
      this.route.navigate(['/admin']);
    }else {
      this.route.navigate(['/dashboard']);
    }
   },err=>{
     localStorage.removeItem('Authorization');
     this.userChange.next(null);
     this.route.navigate(['/login']);
   });
   else{
    this.userChange.next(null);
    this.route.navigate(['/login']);
   }
   }

   getToken(){
     return this.token;
   }
   logout(){
    console.log('heeere');
    localStorage.removeItem('Authorization');
    this.user=null;
    this.token=null;
    this.userChange.next(null);
    this.route.navigate(['/']);
   }

   
   loggedin(){
    if(!this.user){
    this.token = localStorage.getItem('Authorization');
    console.log(this.token);
    if(this.token)
    this.http.get(`${environment.apiHost}/api/users/?Authorization=${this.token}`).subscribe(res=>{
      this.user=res;
      console.log(this.user);
      this.userChange.next({"user":this.user,"token":this.token});
      if(this.user.role == "ADMIN"){
        this.route.navigate(['/admin']);
      }else {
        this.route.navigate(['/dashboard']);
      }
    },err=>{
      localStorage.removeItem('Authorization');
      this.userChange.next(null);
      this.route.navigate(['/login']);
    });
    else{
     this.userChange.next(null);
     this.route.navigate(['/login']);
    }
  }
  if(this.user.role == "ADMIN"){
    this.route.navigate(['/admin']);
  }else {
    this.route.navigate(['/dashboard']);
  }
  }
   getUser(){
     if(!this.user){
      this.token = localStorage.getItem('Authorization');
      console.log(this.token);
      if(this.token)
      this.http.get(`${environment.apiHost}/api/users/?Authorization=${this.token}`).subscribe(res=>{
        this.user=res;
        console.log(this.user);
        this.userChange.next({"user":this.user,"token":this.token});
      },err=>{
        localStorage.removeItem('Authorization');
        this.userChange.next(null);
        this.route.navigate(['/login']);
      });
     }
     return this.user;
   }
}
