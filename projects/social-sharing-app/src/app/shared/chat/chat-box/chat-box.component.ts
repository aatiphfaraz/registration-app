import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
// import { SocketioService } from '../_services/socketio.service';
// import { TokenStorageService } from '../../../_services/token-storage.service';
import { UserService } from '../../../_services/user.service';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  // feedback;
  friendList = [];
  parentVariable = {
    toUser: null,
    sequence: [],
  };

  sequence: any = [];
  constructor(
    // private tokenStorage: TokenStorageService,
    // private socketService: SocketioService,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.socketService.setupSocketConnection();
    // this.socketService.saveUser(this.tokenStorage.getUser());
    // this.socketService.feedback().subscribe((data) => {
    //   this.feedback = data.user + ' is typing...';
    //   console.log(data);
    // });
    this.getFriends();
  }

  getFriends() {
    this.userService.getFollowing().subscribe(
      (data) => {
        const temp = JSON.parse(data);
        temp.map((frn) => {
          this.friendList.push(frn);
        });
        this.userService.getFollowers().subscribe(
          (d) => {
            const temp1 = JSON.parse(d);
            temp1.map((frn) => {
              const chkDup = this.friendList.find((l) => {
                if (frn.id === l.id) {
                  return true;
                } else {
                  return false;
                }
              });

              if (!chkDup) {
                this.friendList.push(frn);
              }
            });
          },
          (err) => {
            this.friendList = JSON.parse(err.error).message;
          }
        );
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
