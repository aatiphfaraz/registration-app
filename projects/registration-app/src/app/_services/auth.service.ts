import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



import {AppComponent} from '../app.component';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user,x): Observable<any> {

    const uploadData = new FormData();
    uploadData.append('username', user.username);
    uploadData.append('email', user.email);
    uploadData.append('password', user.password);
    uploadData.append('userImage', x);

    return this.http.post(AUTH_API + 'signup', uploadData)
  }

  
  
   isAdmin(){

   var bool = false;
   bool = AppComponent.showAdmin();
 if(bool)  {
   return true;
 }  
 else{
   return false;
 }

   }

   
}
