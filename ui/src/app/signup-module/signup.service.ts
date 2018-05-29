import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http:HttpClient) { }
  
  signup(user){
    return this.http.post(`${environment.apiHost}/api/ouath/sign-up`,{
      "firstName":user.firstName,
      "lastName":user.lastName,
      "username":user.username,
      "password":user.password,
      "role":"USER"
    });
  }
}
