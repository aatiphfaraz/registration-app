import { Injectable } from '@angular/core';
import { POSTS } from '../mockData';
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

  remPost(id): Observable<any> {
    return this.http.post(
      API_URL + 'delete',
      {
        id,
      },
      httpOptions
    );
  }

  addPost(title, content): Observable<any> {
    return this.http.post(
      API_URL + 'addPost',
      {
        title,
        content,
      },
      httpOptions
    );
  }

  updatePost(id, title, content): Observable<any> {
    return this.http.post(
      API_URL + 'updatePost',
      {
        id,
        title,
        content,
      },
      httpOptions
    );
  }
}
