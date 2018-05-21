import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  declarations: [UserComponent,UsersComponent],
  exports:[UserComponent,UsersComponent]
})
export class UserModuleModule { }
