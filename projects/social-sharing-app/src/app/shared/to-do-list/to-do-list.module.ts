import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, FormsModule],
  exports: [PostsComponent],
})
export class ToDoListModule {}
