import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModule } from './chat/chat.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';
import { FollowUnfollowComponent } from './follow-unfollow/follow-unfollow.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [FollowUnfollowComponent, HomeComponent],
  imports: [CommonModule, ChatModule, ToDoListModule, FormsModule],
  exports: [HomeComponent, FollowUnfollowComponent],
})
export class SharedModule {}
