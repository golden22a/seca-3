import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  
  login(user){
    return this.http.post(`${environment.apiHost}/api/ouath/login`,{
      "username":user.username,
      "password":user.password
    });
  }
}
