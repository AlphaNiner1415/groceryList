import { TestBed } from '@angular/core/testing';

import { MallSelectorService } from './mall-selector.service';

describe('MallSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MallSelectorService = TestBed.get(MallSelectorService);
    expect(service).toBeTruthy();
  });
});
