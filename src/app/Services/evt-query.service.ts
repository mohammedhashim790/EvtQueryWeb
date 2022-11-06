import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventParams, Events} from "../app.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EvtQueryService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept':'*',
      'Content-Type':  'application/json',
      'Authorization':  '*'
    })};

  private header = new HttpHeaders({
    'Accept':'*',
    'Content-Type':  'application/json',
    'Authorization':  '*',
  });

  constructor(
    private http:HttpClient
  ) { }


  public QueryList():Observable<Array<EventParams>>{
    return this.http.get<Array<EventParams>>(
      environment.apiUrl+"List/Security",
      this.httpOptions
      );
  }

  public Paginate(page:number):Observable<Array<EventParams>>{
    return this.http.get<Array<EventParams>>(
      environment.apiUrl+"List/Security?page=" + page,
      this.httpOptions
      );
  }



  public TotalQueriesIn(query:string):Observable<any>{
    return this.http.get<any>(
      environment.apiUrl + "List/Total/"+query,
      this.httpOptions
    );
  }


  NextChannelsFrom(query: string, eventRecordId: any) {
    return this.http.get<Array<EventParams>>(
      environment.apiUrl+"List/Next/"+query + "/" + eventRecordId,
      this.httpOptions
    );
  }


  PrevChannelsOf(query: string, eventRecordId: string) {
    return this.http.get<Array<EventParams>>(
      environment.apiUrl+"List/Prev/"+query + "/" + eventRecordId,
      this.httpOptions
    );
  }

  GetArray(query: string) {
    return this.http.get<Array<EventParams>>(
      environment.apiUrl+"Get",
      this.httpOptions
    );
  }
  RefreshArray(query: string) {
    return this.http.post<Array<EventParams>>(
      environment.apiUrl+"Refresh",
      this.httpOptions
    );
  }


}
