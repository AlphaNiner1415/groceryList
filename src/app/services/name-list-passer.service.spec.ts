import { TestBed } from '@angular/core/testing';

import { NameListPasserService } from './name-list-passer.service';

describe('NameListPasserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NameListPasserService = TestBed.get(NameListPasserService);
    expect(service).toBeTruthy();
  });
});
