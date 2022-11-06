import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventParams} from "../../app.component";


export enum InfoOnDisplay{
  GENERAL,
  JSON_DETAIL
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  @Input() data!:EventParams;
  @Output() onClose:EventEmitter<void> = new EventEmitter<void>();

  InfoOnDisplay = InfoOnDisplay;

  infoOnDisplay = InfoOnDisplay.GENERAL;

  constructor() { }

  ngOnInit(): void {
  }

  EventDataOf(value: string) {
    return this.data.EventData.Data.find((key:any)=>key?.Name == value)?.
   [""] ;
  }
}
