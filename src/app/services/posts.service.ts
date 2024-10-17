import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInterface } from '../models/Post.Interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://jsonplaceholder.typicode.com/postss'

  constructor(private _httpClient: HttpClient) { }

  createPost(post: PostInterface):Observable<PostInterface>{
    return this._httpClient.post<PostInterface>(`${this.baseUrl}`, post)
  }

  getAllPosts(): Observable<PostInterface[]>{
    return this._httpClient.get<PostInterface[]>(`${this.baseUrl}`)
  }

  getSinglePost(postId: string): Observable<PostInterface>{
    return this._httpClient.get<PostInterface>(`${this.baseUrl}/${postId}`)
  }

  updatePost(post: PostInterface):Observable<PostInterface>{
    return this._httpClient.put<PostInterface>(`${this.baseUrl}/${post.id}`, post)
  }

  deletePost(postId: number):Observable<PostInterface>{
    return this._httpClient.delete<PostInterface>(`${this.baseUrl}/${postId}`)
  }
}
