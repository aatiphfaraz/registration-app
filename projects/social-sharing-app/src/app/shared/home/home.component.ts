import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string;
  following;
  followers;
  followingCount;
  followersCount;
  followerToggle = false;
  followingToggle = false;
  upload = false;
  selectedFile;
  url;
  isLoggedIn;
  img;
  edit = false;
  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUser().username;
    }
    this.getFollowing();
    this.getFollowers();
    this.getImg();
  }

  getFollowing() {
    this.userService.getFollowing().subscribe(
      (data) => {
        this.followingCount = JSON.parse(data).length;
        this.following = JSON.parse(data);
        console.log('following', JSON.parse(data));
      },
      (err) => {
        this.following = JSON.parse(err.error).message;
      }
    );
  }

  getFollowers() {
    this.userService.getFollowers().subscribe(
      (data) => {
        this.followersCount = JSON.parse(data).length;
        this.followers = JSON.parse(data);
        console.log('followers', JSON.parse(data));
      },
      (err) => {
        this.followers = JSON.parse(err.error).message;
      }
    );
  }

  getImg() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

      if (this.tokenStorage.getUser().path !== null) {
        this.img = 'http://localhost:8080' + this.tokenStorage.getUser().path;
      }
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      reader.onload = (event) => {
        // called once readAsDataURL is completed

        console.log(typeof event.target.result);
        this.url = event.target.result;
        this.upload = true;
      };
    }
  }
  onSubmit() {
    this.userService.uploadImg(this.selectedFile).subscribe();
  }
}
