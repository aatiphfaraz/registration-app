import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(API_URL + 'users', { responseType: 'text' });
  }

  remUser(x): Observable<any> {
    return this.http.post(
      API_URL + 'users',
      {
        id: x,
      },
      httpOptions
    );
  }

  followUser(id): Observable<any> {
    return this.http.post(
      API_URL + 'followUser',
      {
        friendId: id,
      },
      httpOptions
    );
  }

  getUsersToFollow(): Observable<any> {
    return this.http.get('http://localhost:8080/getUsers', {
      responseType: 'text',
    });
  }
  unfollowUser(id): Observable<any> {
    return this.http.post(
      API_URL + 'unfollowUser',
      {
        friendId: id,
      },
      httpOptions
    );
  }

  getFollowers(): Observable<any> {
    return this.http.get('http://localhost:8080/followers', {
      responseType: 'text',
    });
  }
  getFollowing(): Observable<any> {
    return this.http.get('http://localhost:8080/following', {
      responseType: 'text',
    });
  }
  uploadImg(img) {
    const uploadData = new FormData();

    uploadData.append('userImage', img);

    return this.http.post(API_URL + 'img', uploadData);
  }
}
