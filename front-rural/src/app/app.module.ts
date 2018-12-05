import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'ngx-easy-table';
import { HttpClientModule } from '@angular/common/http';
import { PlazaService } from './configuration.service';
import { WebSocketService } from './web-socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    AppRoutingModule,
  ],
  providers: [PlazaService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
