import { UsersService } from './users.service';
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('UsersService', () =>{
  let service: UsersService;
  let httpMock: HttpTestingController;
  let dummyUser=[] ;
  let user;
  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations:[],
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          UsersService
        ]
      })
      .compileComponents();
      service = TestBed.get(UsersService);
      httpMock = TestBed.get(HttpTestingController);
      
      this.dummyUsers = [{ 
          
          firstname: 'string',
          lastname: 'string',
          
      }];
    }));
    it('getAllUsers() should return all users', async(() => {
      service.allUsers()
      .subscribe(res => {
      // When observable resolves, result should match test data
        expect(res).toEqual(this.dummyUsers);
        expect(res.length).toBe(1);
      });
  
  // The following `expectOne()` will match the request's URL.    
      let mock = httpMock.expectOne('/api/users');
      // Assert that the request is a GET.
      expect(mock.request.method).toBe("GET");
      
      // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
      mock.flush(this.dummyUsers);
      
      // Finally, assert that there are no outstanding requests.
      httpMock.verify();
    }))
    it('addUser() shoud return user',async(()=>{
      this.user={firstname: 'string',
      lastname: 'string'}
      service.addUser(this.user.firstname,this.user.lastname).subscribe(res=>{
        expect(res).toEqual(this.user);

      })
      let mock = httpMock.expectOne('/api/users');
      expect(mock.request.method).toBe("POST");
      mock.flush(this.user);
      httpMock.verify();
    }))
    it('deleteUser() should return succes',async(()=>{

      this.user={
        id:'long',
        firstname: 'string',
      lastname: 'string'}
      service.deleteUser(this.user.id).subscribe(res=>{
        expect(res).toEqual(200);
      })
      let mock = httpMock.expectOne(`/api/users/${this.user.id}`);
      expect(mock.request.method).toBe("DELETE");
      mock.flush(200);
      httpMock.verify();
    }))
    it('updateUser() should update the user',async(()=>{
      this.user={
        id:'long',
        firstname: 'string',
      lastname: 'string'}
      service.updateUser(this.user.id,this.user.firstname,this.user.lastname).subscribe(res=>{
        expect(res).toEqual(this.user);
      })
      let mock = httpMock.expectOne(`/api/users/${this.user.id}`);
      expect(mock.request.method).toBe("PATCH");
      mock.flush(this.user);
      httpMock.verify();
    }))
});


