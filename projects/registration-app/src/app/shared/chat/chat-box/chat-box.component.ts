import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  friendIndex = [];
  friendList;
  str = '?';
  parentVariable = {
    toUser: null,
    sequence: [],
  };

  sequence: any = [];
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    this.chatService.getFriendsI().subscribe(
      (data) => {
        const temp = JSON.parse(data);
        temp.map((frn) => {
          this.friendIndex.push(frn.friendId);
        });

        this.friendIndex.map((i) => {
          this.str += 'ids[]=' + i + '&';
        });
        this.getFriendList();
      },
      (err) => {
        this.friendIndex = JSON.parse(err.error).message;
      }
    );
  }
  getFriendList() {
    this.chatService.getFriends(this.str).subscribe(
      (data) => {
        this.friendList = JSON.parse(data);
      },
      (err) => {
        this.friendList = JSON.parse(err.error).message;
      }
    );
  }

  onSelect(user): void {
    this.parentVariable.toUser = user;
    this.parentVariable.sequence = [];
    this.chatService.getMsgs(user.id).subscribe((msgs) => {
      this.parentVariable.sequence = JSON.parse(msgs);
    });
  }
}
