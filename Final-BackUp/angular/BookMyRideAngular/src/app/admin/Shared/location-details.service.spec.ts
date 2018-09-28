import { TestBed, inject } from '@angular/core/testing';

import { LocationDetailsService } from './location-details.service';

describe('LocationDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationDetailsService]
    });
  });

  it('should be created', inject([LocationDetailsService], (service: LocationDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
