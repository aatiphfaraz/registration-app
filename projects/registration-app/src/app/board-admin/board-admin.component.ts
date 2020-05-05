import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      (data) => {
        this.content = JSON.parse(data);
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  test(i: object) {
    const j = this.content[this.content.indexOf(i)].id;
    this.userService.remUser(j).subscribe(
      (data) => {
        console.log(data);
        this.content.splice(this.content.indexOf(i), 1);
        alert(data);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
