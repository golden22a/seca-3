import { TestBed, inject } from '@angular/core/testing';

import { RecordsService } from './records.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RecordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordsService],
      imports:[HttpClientTestingModule]

    });
  });

  it('should be created', inject([RecordsService], (service: RecordsService) => {
    expect(service).toBeTruthy();
  }));
});
