import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from './_services/auth.guard';
import { LoginGuard } from './_services/login.guard';
import { FollowUnfollowComponent } from './shared/follow-unfollow/follow-unfollow.component';
import { ChatBoxComponent } from './shared/chat/chat-box/chat-box.component';
import { PostsComponent } from './shared/to-do-list/posts/posts.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'list', component: PostsComponent, canActivate: [LoginGuard] },
  { path: 'findFriend', component: FollowUnfollowComponent },
  {
    path: 'chat',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./shared/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
