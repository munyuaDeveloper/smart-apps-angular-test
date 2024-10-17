import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostsService } from '../../services/posts.service';
import { PostInterface } from '../../models/Post.Interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  private _postService = inject(PostsService);
  private _activatedRoute = inject(ActivatedRoute)

  postDetails$!: Observable<PostInterface>

  ngOnInit(): void {
    const postId = this._activatedRoute.snapshot.paramMap.get('id') as string;
     this.postDetails$ = this._postService.getSinglePost(postId)
  }
}
