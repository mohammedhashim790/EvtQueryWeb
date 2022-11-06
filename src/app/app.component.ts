import { Component } from '@angular/core';
import {EvtQueryService} from "./Services/evt-query.service";
import {DatePipe} from "@angular/common";
import {FormControl} from "@angular/forms";



export interface EventParams{
    System : {
      Provider : {
        Name : "",
        Guid : ""
      },
      EventID : "",
      Version : "",
      Level : "",
      Task : "",
      Opcode : "",
      Keywords : "",
      TimeCreated : {
        SystemTime : ""
      },
      EventRecordID : "",
      Correlation: {
        ActivityID : ""
      },
      Execution : {
        ProcessID : "",
        ThreadID : ""
      },
      Channel : "",
      Computer : "",
      Security : ""
    },
    EventData : {
      Data : [ {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "": ""
      }, {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "": ""
      }, {
        Name : "",
        "": ""
      }, {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "" : ""
      }, {
        Name : "",
        "" : ""
      } ]
    },
    RenderingInfo : {
      Culture : "",
      Message : "",
      Level : "",
      Task : "",
      Opcode : "",
      Channel : "",
      Provider : "",
      Keywords : {
        Keyword : ""
      }
    }
}

export interface Events{
  Event:Array<EventParams>
}
export var printer = console.log;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvtApp';

  data:Array<EventParams> = [];
  pageEntries = -1;
  totalEntries: number = -1;

  currentPage:number = 0;
  private head!: EventParams;

  get TotalPageNumber(){
    if(this.pageEntries == -1){
      return "";
    }
    return Math.ceil(this.totalEntries / this.pageEntries);
  }


  Date(value:any){
    return this.datePipe.transform(value);
  }


  private security:string = "Security";
  showDialogParams: EventParams | undefined;

  get Now(){
    return Date.now();
  }


  EventDataOf(value: string) {
    return this.data[0].EventData.Data.find((key:any)=>key?.Name == value)?.
      [""] ;
  }


  constructor(
    private datePipe:DatePipe,
    private api:EvtQueryService) {

    this.api.QueryList().toPromise().then((res)=>{
      if(res){
        printer(res);
        this.data = res;
        this.head = this.data[0];
        this.pageEntries = this.data.length;
        // this.currentPage++;
      }
    }).catch((error)=>{
      printer(error);
    });
    this.api.TotalQueriesIn(this.security).toPromise().then((res)=>{
      this.totalEntries = res["Security"];
    }).catch((err)=>{
      printer(err);
    })
  }

  NextSlide(){
    let eventRecordId = this.data[this.pageEntries-1].System.EventRecordID;
    this.api.Paginate(this.currentPage+1).toPromise().then((res)=>{
      if(res){
        printer(res);
        this.data = res;
        this.head = this.data[0];
        this.pageEntries = this.data.length;
        this.currentPage++;
      }
    }).catch((error)=>{
      printer(error);
    });
  }

  PrevSlide(){
    printer(this.currentPage)
    if(this.currentPage==0){
      return;
    }
    let eventRecordId = this.data[this.pageEntries-1].System.EventRecordID;
    this.api.Paginate(this.currentPage-1).toPromise().then((res)=>{
      if(res){
        printer(res);
        this.data = res;
        this.head = this.data[0];
        this.pageEntries = this.data.length;
        this.currentPage--;
      }
    }).catch((error)=>{
      printer(error);
    });


  }

  ShowDialogParams(row:EventParams) {
    this.showDialogParams = row;
  }

  OnPressEnter(pageIndex: any) {
    let value = Number(pageIndex.target.value);
    if(this.head && value !=this.currentPage) {

      let eventRecordId = ( this.pageEntries * value ) + Number(this.head.System.EventRecordID);

      this.api.NextChannelsFrom(this.security,eventRecordId).toPromise().then((res)=>{
        if(res){
          printer(res);
          this.data = res;
          this.pageEntries = this.data.length;
          this.currentPage = value;
        }
      }).catch((error)=>{
        printer(error);
      });

    }
  }

  GetEvents() {
    this.api.QueryList().toPromise().then((res)=>{
      if(res){
        printer(res);
        this.data = res;
        this.head = this.data[0];
        this.pageEntries = this.data.length;
        this.currentPage++;
      }
    }).catch((error)=>{
      printer(error);
    });
  }

  RefreshEvents() {

    if(this.head == undefined){
      this.api.RefreshArray(this.security).toPromise().then((res)=>{
        if(res){
          printer(res);
          this.data = res;
          // this.pageEntries = this.data.length;
          // this.currentPage++;
        }
      }).catch((error)=>{
        printer(error);
      });
    }else{

      printer("New uopdate")

      let recordId = this.head.System.EventRecordID;

      printer(recordId)

      this.api.NextChannelsFrom(this.security,recordId).toPromise().then((res)=>{
        printer("Response");
        printer(res);
      }).catch((error)=>{
        printer("Error");
        printer(error)
      });

    }
  }
}
