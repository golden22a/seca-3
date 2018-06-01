import { environment } from './../environments/environment';
import { CalendarModule } from 'angular-calendar';
import { RecordModule } from './record-module/record.module';
import { UserModuleModule } from './user-module/user-module.module';
import { CalendarComponent } from './calendar/calendar.component';
import { RecordsComponent } from './record-module/records/records.component';
import { DashboardComponent } from './dashboard-module/dashboard/dashboard.component';
import { UsersComponent } from './user-module/users/users.component';
import { SignupComponent } from './signup-module/signup/signup.component';
import { LoginComponent } from './login-module/login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UsersService } from './users.service';
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('UsersService', () =>{
  let service: UsersService;
  let httpMock: HttpTestingController;
  let dummyUser=[] ;
  let user;
  let token;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations:[LoginComponent,
        SignupComponent,
    LogoutComponent,
  DashboardComponent,
HomeComponent,
UpdateUserComponent,
CalendarComponent],
        imports: [
          HttpClientTestingModule,
          AppRoutingModule,
          FormsModule,
          UserModuleModule,
          RouterTestingModule,
          NgxPaginationModule,
          RecordModule,
          CalendarModule
          
        ],
        providers: [
          UsersService,
          
        ]
      })
      .compileComponents();
      service = TestBed.get(UsersService);
      httpMock = TestBed.get(HttpTestingController);
      
      this.dummyUsers = [{ 
          id:'long',
          firstName: 'string',
          lastName: 'string',
          userName:'string',
          role:'string',
          password:'string'
          
      }];
    }));
    it('getAllUsers() should return all users', async(() => {
      service.allUsers()
      .subscribe(res => {
        let temp: any =res;
      // When observable resolves, result should match test data
        expect(res).toEqual(this.dummyUsers);
        expect(temp.length).toBe(1);
      });
  
  // The following `expectOne()` will match the request's URL.
      let mock = httpMock.expectOne(`${environment.apiHost}/api/users/all?Authorization=${service.token}`);
      // Assert that the request is a GET.
      expect(mock.request.method).toBe("GET");
      
      // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
      mock.flush(this.dummyUsers);
      
      // Finally, assert that there are no outstanding requests.
      httpMock.verify();
    }))
    it('addUser() shoud return user',async(()=>{
      this.user={firstName: 'string',
      lastName: 'string',
      userName:'string',
      role:'string',
      password:'string'}
      service.addUser(this.user.firstName
        ,this.user.lastName
        ,this.user.userName
        ,this.user.password,
        this.user.role).subscribe(res=>{
        expect(res).toEqual(this.user);

      })
      let mock = httpMock.expectOne(`${environment.apiHost}/api/users/?Authorization=${service.token}`);
      expect(mock.request.method).toBe("POST");
      mock.flush(this.user);
      httpMock.verify();
    }))
    it('deleteUser() should return succes',async(()=>{

      this.user={
        lastName: 'string',
      userName:'string',
      role:'string',
      password:'string'}
      service.deleteUser(this.user.id).subscribe(res=>{
        expect(res).toEqual(200);
      })
      let mock = httpMock.expectOne(`${environment.apiHost}/api/users/${this.user.id}/?Authorization=${service.token}`);
      expect(mock.request.method).toBe("DELETE");
      mock.flush(200);
      httpMock.verify();
    }))
    it('updateUser() should update the user',async(()=>{
      this.user={
        id:'long',
        lastName: 'string',
      userName:'string',
      role:'string',
      password:'string'}
      service.updateUser(this.user.id,this.user.firstName,
        this.user.lastName,this.user.username,this.user.password,this.user.role).subscribe(res=>{
        expect(res).toEqual(this.user);
      })
      let mock = httpMock.expectOne(`${environment.apiHost}/api/users/${this.user.id}/?Authorization=${service.token}`);
      expect(mock.request.method).toBe("PATCH");
      mock.flush(this.user);
      httpMock.verify();
    }))
});


