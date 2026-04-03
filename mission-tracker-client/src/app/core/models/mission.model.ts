import { BaseEntity } from './base.model';

export enum MissionStatus {
  Planned = 0,
  Active = 1,
  Completed = 2,
  Failed = 3
}

export interface Mission extends BaseEntity {
  name: string;
  description: string;
  status: MissionStatus;
  launchDate?: string;
  satelliteName: string;
}

export interface CreateMissionRequest {
  name: string;
  description: string;
  satelliteId: number;
  launchDate?: string;
}