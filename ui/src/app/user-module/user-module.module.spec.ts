import { UserComponent } from './user/user.component';
import { UserModuleModule } from './user-module.module';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';


describe('UserModuleModule', () => {
  let userModuleModule: UserModuleModule;

  beforeEach(() => {
    userModuleModule = new UserModuleModule();
  });

  it('should create an instance', () => {
    expect(userModuleModule).toBeTruthy();
  });
});
