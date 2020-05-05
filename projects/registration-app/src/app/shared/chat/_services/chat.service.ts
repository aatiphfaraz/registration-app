import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getFriendsI(): Observable<any> {
    return this.http.get('http://localhost:8080/getFriend', {
      responseType: 'text',
    });
  }
  getFriends(ids): Observable<any> {
    return this.http.get('http://localhost:8080/getFriendList/' + ids, {
      responseType: 'text',
    });
  }

  addMsg(user, message): Observable<any> {
    return this.http.post(
      'http://localhost:8080/addMsg',
      {
        toUser: user,
        message,
      },
      httpOptions
    );
  }

  getMsgs(toUser): Observable<any> {
    return this.http.get('http://localhost:8080/getMessages/' + toUser, {
      responseType: 'text',
    });
  }
}
