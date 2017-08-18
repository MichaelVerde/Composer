import { TestBed, inject } from '@angular/core/testing';

import { GateServiceService } from './gate-service.service';

describe('GateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GateServiceService]
    });
  });

  it('should be created', inject([GateServiceService], (service: GateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
