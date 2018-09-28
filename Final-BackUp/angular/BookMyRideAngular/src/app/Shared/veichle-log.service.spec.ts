import { TestBed, inject } from '@angular/core/testing';

import { VeichleLogService } from './veichle-log.service';

describe('VeichleLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VeichleLogService]
    });
  });

  it('should be created', inject([VeichleLogService], (service: VeichleLogService) => {
    expect(service).toBeTruthy();
  }));
});
