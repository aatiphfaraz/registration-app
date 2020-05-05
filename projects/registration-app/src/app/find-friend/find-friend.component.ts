import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.css'],
})
export class FindFriendComponent implements OnInit {
  query;
  users;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usersFetch();
  }

  usersFetch() {
    this.userService.getAdminBoard().subscribe(
      (data) => {
        this.users = JSON.parse(data);
      },
      (err) => {
        this.users = JSON.parse(err.error).message;
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

  addFriend(id) {
    this.userService.addFriend(id).subscribe(() => console.log('Added'));
  }
}
