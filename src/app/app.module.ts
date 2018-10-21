import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { StopwatchPipe } from './stopwatch.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClockComponent } from './clock/clock.component';
import { CoolStorageModule } from '@angular-cool/storage';
import { SplitDigitsPipe } from './split-digits.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent,
    StopwatchPipe,
    ClockComponent,
    SplitDigitsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoolStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
