import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class UsersService {

  constructor(private http:HttpClient) { }
  allUsers(){
    return this.http.get(`${environment.apiHost}/api/users`);
  }
  addUser(firstName,lastName){
    return this.http.post('/api/users',{
      "firstName":firstName,
      "lastName":lastName
    })
  }
  deleteUser(id){
    return this.http.delete(`/api/users/${id}`);

  }
  updateUser(id,firstName,lastName){
    return this.http.patch(`/api/users/${id}`,{
      "firstName":firstName,
      "lastName":lastName
    })
  }
}
