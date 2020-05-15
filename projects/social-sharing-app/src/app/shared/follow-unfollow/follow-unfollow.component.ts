import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-follow-unfollow',
  templateUrl: './follow-unfollow.component.html',
  styleUrls: ['./follow-unfollow.component.css'],
})
export class FollowUnfollowComponent implements OnInit {
  query;
  users = [];
  following = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getFollowing();
  }

  getUsers() {
    this.userService.getUsersToFollow().subscribe(
      (data) => {
        this.users = JSON.parse(data);
      },
      (err) => {
        this.users = JSON.parse(err.error).message;
      }
    );
  }

  getFollowing() {
    this.userService.getFollowing().subscribe(
      (data) => {
        this.following = JSON.parse(data);
      },
      (err) => {
        this.following = JSON.parse(err.error).message;
      }
    );
  }

  search() {
    if (this.query != '') {
      this.users = this.users.filter((res) => {
        return res.username
          .toLocaleLowerCase()
          .match(this.query.toLocaleLowerCase());
      });
    } else if (this.query == '') {
      this.ngOnInit();
    }
  }

  followUser(id) {
    this.userService.followUser(id).subscribe(() => console.log('Followed'));
    this.getUsers();
    this.getFollowing();
  }

  unfollowUser(id) {
    this.userService
      .unfollowUser(id)
      .subscribe(() => console.log('Unfollowed'));
    this.getUsers();
    this.getFollowing();
  }
}
