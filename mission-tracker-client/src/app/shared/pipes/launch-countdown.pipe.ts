import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'launchCountdown', standalone: true })
export class LaunchCountdownPipe implements PipeTransform {

  transform(launchDate?: string): string {
    if (!launchDate) return 'No launch date set';

    const launch = new Date(launchDate);
    const now = new Date();
    const diffMs = launch.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Launched ${Math.abs(diffDays)}d ago`;
    if (diffDays === 0) return '🚀 Launching today';
    return `T-${diffDays} days`;
  }
}