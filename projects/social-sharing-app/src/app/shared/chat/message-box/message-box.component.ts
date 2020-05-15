import { SocketioService } from '../_services/socketio.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { ChatService } from '../_services/chat.service';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  providers: [SocketioService],
})
export class MessageBoxComponent implements OnInit, AfterViewChecked {
  @Input() user;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  message;
  incomingMsg = [];
  outgoingMsg = [];
  fromUser;
  feedback;

  constructor(
    private tokenStorage: TokenStorageService,
    private socketService: SocketioService,
    private chatService: ChatService
  ) {
    // this.socketService.setupSocketConnection();
    // this.socketService.feedback().subscribe((data) => {
    //   this.feedback = data.user + ' is typing...';
    // });
    // this.socketService.listenEvent().subscribe((data) => {
    //   if (data.fromUser !== this.fromUser) {
    //     this.incomingMsg.push(data.message);
    //     this.user.sequence.push({
    //       in: data.message,
    //       date: Date.now(),
    //     });
    //   }
    //   this.feedback = '';
    // });
  }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    this.socketService.feedback().subscribe((data) => {
      this.feedback = data.user + ' is typing...';
    });
    this.socketService.listenEvent().subscribe((data) => {
      if (data.fromUser !== this.fromUser) {
        this.incomingMsg.push(data.message);
        this.user.sequence.push({
          in: data.message,
          date: Date.now(),
        });
      }
      this.feedback = '';
    });

    this.fromUser = this.tokenStorage.getUser().id;
    this.socketService.saveUser(this.tokenStorage.getUser());
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    this.socketService.emitEvent(
      this.message,
      this.tokenStorage.getUser(),
      this.user.toUser.username
    );
    this.outgoingMsg.push(this.message);
    this.user.sequence.push({
      out: this.message,
      date: Date.now(),
    });

    this.chatService
      .addMsg(this.user.toUser.id, this.message)
      .subscribe(() => {});
    this.scrollToBottom();
    this.message = '';
  }

  typingEvent() {
    this.socketService.userTyping(
      this.tokenStorage.getUser().username,
      this.user.toUser.username
    );
  }
}
