import { TestBed } from '@angular/core/testing';

import { PlanetdrawerService } from './planetdrawer.service';

describe('PlanetdrawerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetdrawerService = TestBed.get(PlanetdrawerService);
    expect(service).toBeTruthy();
  });
});
