import { TestBed, inject } from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports:[HttpClientTestingModule]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
