import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MissionService } from '../../core/services/mission.service';
import { SatelliteService } from '../../core/services/satellite.service';
import { Mission, MissionStatus } from '../../core/models/mission.model';
import { Satellite } from '../../core/models/satellite.model';
import { MissionStatusPipe } from '../../shared/pipes/mission-status.pipe';
import { LaunchCountdownPipe } from '../../shared/pipes/launch-countdown.pipe';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatChipsModule,
    MatIconModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MissionStatusPipe, LaunchCountdownPipe
  ],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>🛰️ Missions</h1>
        <a mat-button routerLink="/satellites">Satellites</a>
      </div>

      <!-- Create form -->
      <mat-card class="create-card">
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="create()" class="create-form">

            <mat-form-field appearance="outline">
              <mat-label>Mission Name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <input matInput formControlName="description" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Satellite</mat-label>
              <mat-select formControlName="satelliteId">
                <mat-option *ngFor="let sat of satellites" [value]="sat.id">
                  {{ sat.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary"
                    type="submit" [disabled]="form.invalid">
              Add Mission
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Mission cards -->
      <div class="mission-grid">
        <mat-card *ngFor="let mission of missions">
          <mat-card-header>
            <mat-card-title>{{ mission.name }}</mat-card-title>
            <mat-card-subtitle>{{ mission.satelliteName }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>{{ mission.description }}</p>
            <p><strong>Status:</strong> {{ mission.status | missionStatus }}</p>
            <p><strong>Launch:</strong> {{ mission.launchDate | launchCountdown }}</p>
            <p class="meta">Created {{ mission.createdAt | date:'mediumDate' }}</p>
          </mat-card-content>

          <mat-card-actions>
            <mat-select
              placeholder="Update status"
              (selectionChange)="changeStatus(mission.id, $event.value)">
              <mat-option [value]="0">Planned</mat-option>
              <mat-option [value]="1">Active</mat-option>
              <mat-option [value]="2">Completed</mat-option>
              <mat-option [value]="3">Failed</mat-option>
            </mat-select>

            <button mat-icon-button color="warn" (click)="delete(mission.id)">
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
      align-items: center; margin-bottom: 2rem;
    }
    .create-card { margin-bottom: 2rem; }
    .create-form {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem; align-items: end;
    }
    .mission-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    mat-card-actions {
      display: flex; align-items: center;
      justify-content: space-between; padding: 0 1rem 1rem;
    }
    mat-select { width: 160px; }
    .meta { font-size: 0.8rem; color: #888; margin-top: 0.5rem; }
  `]
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  satellites: Satellite[] = [];
  form: FormGroup;

  constructor(
    private missionService: MissionService,
    private satelliteService: SatelliteService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      description: ['', Validators.required],
      satelliteId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.load();
    this.loadSatellites();
  }

  load(): void {
    this.missionService.getAll().subscribe(m => {
      this.missions = m;
      this.cdr.detectChanges();
    });
  }

  loadSatellites(): void {
    this.satelliteService.getAll().subscribe(s => {
      this.satellites = s;
      this.cdr.detectChanges();
    });
  }

  create(): void {
    this.missionService.create(this.form.value).subscribe(() => {
      this.form.reset();
      this.load();
    });
  }

  changeStatus(id: number, status: MissionStatus): void {
    this.missionService.updateStatus(id, status).subscribe(() => this.load());
  }

  delete(id: number): void {
    this.missionService.remove(id).subscribe(() => this.load());
  }
}