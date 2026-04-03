import { Pipe, PipeTransform } from '@angular/core';
import { OrbitType } from '../../core/models/satellite.model';

@Pipe({ name: 'orbitType', standalone: true })
export class OrbitTypePipe implements PipeTransform {

  transform(orbit: OrbitType): string {
    const map: Record<OrbitType, string> = {
      [OrbitType.LEO]: 'LEO — Low Earth Orbit (~400km)',
      [OrbitType.MEO]: 'MEO — Medium Earth Orbit (~20,000km)',
      [OrbitType.GEO]: 'GEO — Geostationary (~35,786km)',
      [OrbitType.HEO]: 'HEO — Highly Elliptical'
    };
    return map[orbit] ?? 'Unknown';
  }
}