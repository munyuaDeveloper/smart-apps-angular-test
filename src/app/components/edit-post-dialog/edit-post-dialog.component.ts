import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostInterface } from '../../models/Post.Interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.scss',
})
export class EditPostDialogComponent implements OnInit {
  private _dialogRef = inject(MatDialogRef<EditPostDialogComponent>);
  private _data = inject<PostInterface>(MAT_DIALOG_DATA);
  private _fb = inject(FormBuilder);

  postForm!: FormGroup;

  ngOnInit(): void {
    this.postForm = this._fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
    this.postForm.patchValue({
      ...this._data
    })
  }

  closeDialog(){
    this._dialogRef.close(this.postForm.value)
  }
}
