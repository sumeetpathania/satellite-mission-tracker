import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { Satellite, CreateSatelliteRequest } from '../models/satellite.model';

@Injectable({ providedIn: 'root' })
export class SatelliteService extends BaseApiService {

  // Only thing this class defines — its endpoint
  protected readonly baseUrl = 'http://localhost:5084/api/satellites';

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<Satellite[]> {
    return this.get<Satellite[]>();
  }

  create(request: CreateSatelliteRequest): Observable<Satellite> {
    return this.post<Satellite>('', request);
  }

  remove(id: number): Observable<void> {
    return this.delete<void>(`/${id}`);
  }
}