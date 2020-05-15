import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts = [];
  content;
  title;
  edit;
  editTitle;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        const temp = [];
        const json = JSON.parse(data);
        json.map((x) => {
          temp.push({
            id: x.id,
            title: x.title,
            content: x.content,
            edittable: false,
          });
        });
        this.posts = temp;
      },
      (err) => {
        this.posts = JSON.parse(err.error).message;
      }
    );
  }

  remPost(id) {
    this.postService.remPost(id).subscribe(
      (data) => {
        this.getPosts();
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  editPost(id) {
    const editIndex = this.posts
      .map(function(item) {
        return item.id;
      })
      .indexOf(id);
    this.posts[editIndex].edittable = true;
  }

  updatePost(id, title, content) {
    this.postService.updatePost(id, this.editTitle, this.edit).subscribe(() => {
      this.getPosts();
    });
  }

  onSubmit() {
    this.postService.addPost(this.title, this.content).subscribe(() => {
      this.getPosts();
      this.content = null;
      this.title = null;
    });
  }
}
