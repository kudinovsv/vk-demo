import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AlertErrorHandler } from './error-handler';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, HttpClientJsonpModule],
  providers: [{provide: ErrorHandler, useClass: AlertErrorHandler}],
  declarations: [AppComponent, UserListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
