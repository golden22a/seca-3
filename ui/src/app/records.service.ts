import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  getAllPublicHearings(){
    var today = new Date();
    return this.http.get(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=type_of_notice_description in('Public Hearings','Meeting') and end_date >= '${today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()}'`);
  }
}
