import { RecordsService } from './../../records.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input('record')
  record: any;
  address;
  constructor(private recordService:RecordsService) { }

  ngOnInit() {
    this.address=" No Address Required";
    if(this.record.street_address_1 != 'No Address Required'){
      this.address=this.record.street_address_1 + " " +(this.record.street_address_2 || "")+", "+this.record.city+", "+this.record.state+", "this.record.zip_code;
    }
  }
  add(){
    this.recordService.add(this.record).subscribe(a => console.log(a))
  }
}
