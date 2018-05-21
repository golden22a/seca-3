import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  getAllPublicHearings(){
    return this.http.get("https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=type_of_notice_description in('Public Hearings','Meeting')");
  }
}
