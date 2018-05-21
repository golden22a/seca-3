import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http:Http) { }

  getAllPublicHearings(){
    return this.http.get("https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=type_of_notice_description in('Public Hearings','Meeting')");
  }
}
