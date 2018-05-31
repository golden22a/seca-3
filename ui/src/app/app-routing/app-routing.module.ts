import { CalendarComponent } from './../calendar/calendar.component';
import { DashboardComponent } from './../dashboard-module/dashboard/dashboard.component';
import { LoginComponent } from './../login-module/login/login.component';
import { UsersComponent } from './../user-module/users/users.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecordsComponent} from './../record-module/records/records.component';
import { SignupComponent } from '../signup-module/signup/signup.component';
import { UserComponent } from '../user-module/user/user.component';
import {LogoutComponent} from '../logout/logout.component';
import {HomeComponent} from '../home/home.component';
import {UpdateUserComponent} from '../update-user/update-user.component'
const routes: Routes = [
      {
        path:'login',
        component:LoginComponent
      },
     
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'admin',
        component:UsersComponent
      },
      {
        path:'logout',
        component:LogoutComponent
      },{
        path:'',
        component:HomeComponent
      }
  ];
const childRoute: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:RecordsComponent
      },{
        path:'calendar',
        component:CalendarComponent
      },{
        path:'update',
        component:UpdateUserComponent
      }
    ]
  }
  ,
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(childRoute)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
