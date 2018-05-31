import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CurrentUserService } from './current-user.service';
@Injectable()
export class UsersService {
  user;
  token;
  constructor(private http:HttpClient,private currentUser:CurrentUserService) { 
    this.currentUser.userChange.subscribe(data=>{
      this.user=data.user;
      this.token=data.token;
    })
    if(!this.token){
      this.token = this.currentUser.getToken();
    }
  }
  allUsers(){
    return this.http.get(`${environment.apiHost}/api/users/all?Authorization=${this.token}`);
  }
  addUser(firstName,lastName,username,password,role){
    console.log(role);
    
    return this.http.post(`${environment.apiHost}/api/users/?Authorization=${this.token}`,{
      "firstName":firstName,
      "lastName":lastName,
      "username":username,
      "password":password,
      "role":role
    })
  }
  deleteUser(id){
    return this.http.delete(`${environment.apiHost}/api/users/${id}/?Authorization=${this.token}`);

  }
  updateUser(id,firstName,lastName,username,password,role){
    return this.http.patch(`${environment.apiHost}/api/users/${id}/?Authorization=${this.token}`,{
      "firstName":firstName,
      "lastName":lastName,
      "username":username,
      "password":password,
      "role":role
    })
  }
  updateSelf(firstName,lastName,password){
    return this.http.patch(`${environment.apiHost}/api/users/?Authorization=${this.token}`,{
      "firstName":firstName,
      "lastName":lastName,
      "password":password
    })
  }
}
