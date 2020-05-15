import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket;
  constructor() {}
  setupSocketConnection() {
    this.socket = io('http://localhost:8080');
  }
  emitEvent(msg, user, to_user) {
    this.socket.emit('chat', {
      message: msg,
      fromUser: user.id,
      userName: user.username,
      toUser: to_user,
    });
  }
  listenEvent() {
    const observable = new Observable<any>((observer) => {
      this.socket.on('chat', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  userTyping(fromUser, targetUser) {
    this.socket.emit('typing', {
      user: fromUser,
      toUser: targetUser,
    });
  }

  feedback() {
    const observable = new Observable<any>((observer) => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
    });

    return observable;
  }

  saveUser(data) {
    this.socket.emit('user_connected', data);
  }
}
