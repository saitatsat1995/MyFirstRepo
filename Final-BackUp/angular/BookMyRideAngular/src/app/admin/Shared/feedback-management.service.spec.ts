import { TestBed, inject } from '@angular/core/testing';

import { FeedbackManagementService } from './feedback-management.service';

describe('FeedbackManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackManagementService]
    });
  });

  it('should be created', inject([FeedbackManagementService], (service: FeedbackManagementService) => {
    expect(service).toBeTruthy();
  }));
});
