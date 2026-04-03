import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
            MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="auth-wrap">
      <h2>Mission Control Login</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">

        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>

        <p class="error" *ngIf="error">{{ error }}</p>

        <button mat-raised-button color="primary"
                type="submit" [disabled]="form.invalid">
          Login
        </button>
      </form>
    </div>
  `,
  styles: [`
    .auth-wrap {
      max-width: 380px; margin: 10vh auto;
      padding: 2rem; display: flex;
      flex-direction: column; gap: 1rem;
    }
    mat-form-field { width: 100%; }
    .error { color: #f44336; font-size: 0.85rem; }
  `]
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/missions']),
      error: () => this.error = 'Invalid credentials'
    });
  }
}