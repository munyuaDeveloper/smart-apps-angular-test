import { Component, OnInit } from '@angular/core';
import { PostInterface } from '../../models/Post.Interface';
import { Observable } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  posts$!: Observable<PostInterface[]>

  constructor(private _postService: PostsService){}

  ngOnInit(): void {
     this.posts$ = this._postService.getAllPosts()
  }

}
