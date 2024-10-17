import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostInterface } from '../../models/Post.Interface';
import { PostsService } from '../../services/posts.service';
import { lastValueFrom, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../../components/edit-post-dialog/edit-post-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private _dialog = inject(MatDialog);
  private _toastService = inject(ToastrService);
  private _postService = inject(PostsService);

  displayedColumns: string[] = ['id', 'title', 'body', 'action'];
  dataSource = new MatTableDataSource<PostInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    lastValueFrom(
      this._postService.getAllPosts().pipe(
        tap((res) => {
          this.dataSource = new MatTableDataSource(res);
        })
      )
    );
  }

  createPost(data: PostInterface) {
    lastValueFrom(
      this._postService.createPost(data).pipe(
        tap((res) => {
          const newList = [...this.dataSource.data];
          newList.unshift(res);
          this.dataSource = new MatTableDataSource(newList);
          this._toastService.success('Post created successfully.');
        })
      )
    );
  }

  updatePost(data: PostInterface) {
    lastValueFrom(
      this._postService.updatePost(data).pipe(
        tap((res) => {
          const prevList = [...this.dataSource.data];

          const updatedPostIndex = prevList.findIndex(
            (item) => item.id === res.id
          );

          if (updatedPostIndex !== -1) {
            prevList[updatedPostIndex] = res;
            this.dataSource = new MatTableDataSource(prevList);
          }
          this._toastService.success('Post details updated successfully.');
        })
      )
    );
  }

  deletePost(postId: number) {
    lastValueFrom(
      this._postService.deletePost(postId).pipe(
        tap(() => {
          let newList = [...this.dataSource.data];
          newList = newList.filter((post) => post.id !== postId);
          this.dataSource = new MatTableDataSource(newList);
          this._toastService.success('Post deleted successfully.');
        })
      )
    );
  }

  openDialog(post: PostInterface | null, action: 'UPDATE' | 'CREATE'): void {
    const dialogRef = this._dialog.open(EditPostDialogComponent, {
      data: action === 'UPDATE' ? post : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'UPDATE') {
          const data = { ...post, ...result };
          this.updatePost(data);
        } else {
          const body: PostInterface = {
            ...result,
            userId: Math.floor(Math.random() * 1000),
          };
          this.createPost(body);
        }
      }
    });
  }
}
