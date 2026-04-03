import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteList } from './satellite-list';

describe('SatelliteList', () => {
  let component: SatelliteList;
  let fixture: ComponentFixture<SatelliteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatelliteList],
    }).compileComponents();

    fixture = TestBed.createComponent(SatelliteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
