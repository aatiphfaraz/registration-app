import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { SocketioService } from './_services/socketio.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatBoxComponent, MessageBoxComponent],
  imports: [CommonModule, FormsModule],
  providers: [SocketioService],
  exports: [ChatBoxComponent],
})
export class ChatModule {}
