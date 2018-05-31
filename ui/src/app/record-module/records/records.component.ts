import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../records.service';
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
   records;
   p;
  constructor(private recordService:RecordsService) { }

  ngOnInit() {
    this.recordService
    .getAllPublicHearings()
    .subscribe(res=> {
      this.records=res;
      console.log(res);

    })
  }

}
