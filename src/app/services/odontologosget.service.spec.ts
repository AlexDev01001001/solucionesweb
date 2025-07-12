import { TestBed } from '@angular/core/testing';

import { OdontologosgetService } from './odontologosget.service';

describe('OdontologosgetService', () => {
  let service: OdontologosgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdontologosgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
