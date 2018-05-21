import { UsersService } from './../../users.service';
import { UserComponent } from './../user/user.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('UsersComponents', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent,UserComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule,FormsModule],
      providers:[UsersService]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
