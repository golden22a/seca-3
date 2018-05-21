import { UsersComponent } from './../user-module/users/users.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecordsComponent} from './../record-module/records/records.component';
const routes: Routes = [
      {
        path:'',
        component:UsersComponent
      },
      {
        path:'users/:id',
        component: RecordsComponent
      }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
