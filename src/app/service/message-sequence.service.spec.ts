import { TestBed } from '@angular/core/testing';

import { MessageSequenceService } from './message-sequence.service';

describe('MessageSequenceService', () => {
  let service: MessageSequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
