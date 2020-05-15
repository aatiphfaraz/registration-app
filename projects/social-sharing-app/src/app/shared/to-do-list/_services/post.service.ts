import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<any> {
    return this.http.get(API_URL + 'getAll', { responseType: 'text' });
  }

  remPost(pId): Observable<any> {
    return this.http.post(
      API_URL + 'delete',
      {
        id: pId,
      },
      httpOptions
    );
  }

  addPost(pTitle, pContent): Observable<any> {
    return this.http.post(
      API_URL + 'addPost',
      {
        title: pTitle,
        content: pContent,
      },
      httpOptions
    );
  }

  updatePost(pId, pTitle, pContent): Observable<any> {
    return this.http.post(
      API_URL + 'updatePost',
      {
        id: pId,
        title: pTitle,
        content: pContent,
      },
      httpOptions
    );
  }
}
