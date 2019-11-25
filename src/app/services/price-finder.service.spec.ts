import { TestBed } from '@angular/core/testing';

import { PriceFinderService } from './price-finder.service';

describe('PriceFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceFinderService = TestBed.get(PriceFinderService);
    expect(service).toBeTruthy();
  });
});
