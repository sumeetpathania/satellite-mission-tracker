import { BaseEntity } from './base.model';

export enum OrbitType {
  LEO = 0,
  MEO = 1,
  GEO = 2,
  HEO = 3
}

// Extends the base interface — inherits id and createdAt
export interface Satellite extends BaseEntity {
  name: string;
  manufacturer: string;
  orbitType: OrbitType;
  massKg: number;
  missionCount: number;
}

export interface CreateSatelliteRequest {
  name: string;
  manufacturer: string;
  orbitType: OrbitType;
  massKg: number;
}