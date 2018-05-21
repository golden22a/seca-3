import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record/record.component';
import { RecordsComponent } from './records/records.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [
    RecordComponent,
    RecordsComponent

  ],
  exports: [RecordsComponent,RecordComponent]

})
export class RecordModule { }
