import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// URLs
const baseURL = "http://127.0.0.1:8000/";
const constUrlUser = "users/signup/";
const login = "access/login/";
const myData = "users/my-account/";
const logout = "access/logout/";
const updateaccount = "users/update-account/";


const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Token ${localStorage.getItem('acces_token')}`
});


@Injectable({
  providedIn: 'root'
})

export class MyserviceService {

  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any> {
    return this.http.post(baseURL + constUrlUser, user);
  }

  logIn(user: any): Observable<any> {
    return this.http.post(baseURL + login, user);
  }

  getData() {
    let username = localStorage.getItem('username');
    return this.http.get(baseURL + myData + username + '/', { headers: headers });
  }

  updateAccount(user: any): Observable<any> {
    return this.http.put(baseURL + updateaccount + user.username + '/', user, { headers: headers } );
  }

  logOut() {
    return this.http.get(baseURL + logout, { headers: headers });
  }
}