import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  // modify the return type to properly use the full response
  login(username: string, password: string) {
    let url: string = 'https://reqres.in/api/login';

    const requestData = {
      email: username,
      password: password,
    };
    return this.http.post(url, requestData);
  }

  getUserList(token: string) {
    let url: string = 'https://reqres.in/api/unknown';
    const headers = new HttpHeaders();
    headers.append('content-type', 'application.json');
    headers.append('Authorization', 'Bearer' + token);
    return this.http.get(url, { headers });
  }
}
