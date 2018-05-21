import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../records.service';
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  private records;
  constructor(private htp:Http,private recordService:RecordsService) { }

  ngOnInit() {
    this.recordService
    .getAllPublicHearings()
    .subscribe(res=> {
      this.records=res.json();
      this.records.splice(0,1);
    })
  }

}
