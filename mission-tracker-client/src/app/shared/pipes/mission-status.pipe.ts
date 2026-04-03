import { Pipe, PipeTransform } from '@angular/core';
import { MissionStatus } from '../../core/models/mission.model';

@Pipe({ name: 'missionStatus', standalone: true })
export class MissionStatusPipe implements PipeTransform {

  // Returns a display-ready string for the HTML template
  transform(status: MissionStatus): string {
    const map: Record<MissionStatus, string> = {
      [MissionStatus.Planned]:   '🔵 Planned',
      [MissionStatus.Active]:    '🟢 Active',
      [MissionStatus.Completed]: '⚪ Completed',
      [MissionStatus.Failed]:    '🔴 Failed'
    };
    return map[status] ?? 'Unknown';
  }
}