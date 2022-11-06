import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EvtQueryService} from "./Services/evt-query.service";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlertDialogComponent } from './Views/alert-dialog/alert-dialog.component';
import { JSONStringifyPipe } from './Bloc/Pipes/JSONStringify/jsonstringify.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponent,
    JSONStringifyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
