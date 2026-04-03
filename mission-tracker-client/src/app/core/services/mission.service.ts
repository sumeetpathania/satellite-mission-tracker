import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { Mission, CreateMissionRequest, MissionStatus } from '../models/mission.model';

@Injectable({ providedIn: 'root' })
export class MissionService extends BaseApiService {

  protected readonly baseUrl = 'http://localhost:5084/api/missions';

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Mission[]> {
    return this.get<Mission[]>();
  }

  create(request: CreateMissionRequest): Observable<Mission> {
    return this.post<Mission>('', request);
  }

  updateStatus(id: number, status: MissionStatus): Observable<void> {
    return this.patch<void>(`/${id}/status`, { status });
  }

  remove(id: number): Observable<void> {
    return this.delete<void>(`/${id}`);
  }
}