import { TodosComponent } from './../todos-module/todos/todos.component';
import { UsersComponent } from './../user-module/users/users.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
      {
        path:'',
        component:UsersComponent
      },
      {
        path:'users/:id',
        component: TodosComponent
      }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
