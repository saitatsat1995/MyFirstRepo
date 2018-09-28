import { TestBed, inject } from '@angular/core/testing';

import { UserOneService } from './user-one.service';

describe('UserOneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOneService]
    });
  });

  it('should be created', inject([UserOneService], (service: UserOneService) => {
    expect(service).toBeTruthy();
  }));
});
