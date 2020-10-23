import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IpHistoryComponent } from './ip-history/ip-history.component';

@NgModule({
  declarations: [AppComponent, IpHistoryComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
