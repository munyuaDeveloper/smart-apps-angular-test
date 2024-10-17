import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _route = inject(Router)

  ngOnInit(): void {
      this.loginForm = this._fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
  }

  login(){
    const {email, password} = this.loginForm.value;
    lastValueFrom(
      this._authService.login(email, password).pipe(
        tap((res) => {
          this._authService.setToken(res.access_token, res.id_token)
          this._route.navigate(['/admin'])
        })
      )
    )
  }
}
