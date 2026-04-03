import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SatelliteService } from '../../core/services/satellite.service';
import { Satellite, OrbitType } from '../../core/models/satellite.model';
import { OrbitTypePipe } from '../../shared/pipes/orbit-type.pipe';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-satellite-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatIconModule,
    OrbitTypePipe
  ],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>🛸 Satellites</h1>
        <a mat-button routerLink="/missions">Missions</a>
      </div>

      <mat-card class="create-card">
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="create()" class="create-form">

            <mat-form-field appearance="outline">
              <mat-label>Satellite Name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Manufacturer</mat-label>
              <input matInput formControlName="manufacturer" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Orbit Type</mat-label>
              <mat-select formControlName="orbitType">
                <mat-option [value]="0">LEO</mat-option>
                <mat-option [value]="1">MEO</mat-option>
                <mat-option [value]="2">GEO</mat-option>
                <mat-option [value]="3">HEO</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Mass (kg)</mat-label>
              <input matInput type="number" formControlName="massKg" />
            </mat-form-field>

            <button mat-raised-button color="primary"
                    type="submit" [disabled]="form.invalid">
              Add Satellite
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <div class="satellite-grid">
        <mat-card *ngFor="let sat of satellites">
          <mat-card-header>
            <mat-card-title>{{ sat.name }}</mat-card-title>
            <mat-card-subtitle>{{ sat.manufacturer }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>{{ sat.orbitType | orbitType }}</p>
            <p>{{ sat.massKg }} kg · {{ sat.missionCount }} missions</p>
          </mat-card-content>

          <mat-card-actions>
            <button mat-icon-button color="warn" (click)="remove(sat.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 1100px; margin: 0 auto; }
    .page-header {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 1.5rem;
    }
    .create-card { margin-bottom: 2rem; }
    .create-form {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem; align-items: end;
    }
    .satellite-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
  `]
})
export class SatelliteListComponent implements OnInit {
  satellites: Satellite[] = [];
  form: FormGroup;

  constructor(
    private satService: SatelliteService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef

  ) {
    this.form = this.fb.group({
      name:         ['', Validators.required],
      manufacturer: ['', Validators.required],
      orbitType:    [0,  Validators.required],
      massKg:       [0,  [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.satService.getAll().subscribe(s => {
      this.satellites = s;
      this.cdr.detectChanges();
    });
  }

  create(): void {
    this.satService.create(this.form.value as any).subscribe(() => {
      this.form.reset({ orbitType: 0, massKg: 0 });
      this.load();
    });
  }

  remove(id: number): void {
    this.satService.remove(id).subscribe(() => this.load());
  }
}