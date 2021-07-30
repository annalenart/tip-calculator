import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BillInfoComponent } from './components/splitter/bill-info/bill-info.component';
import { AmountComponent } from './components/splitter/result/amount/amount.component';
import { ResultComponent } from './components/splitter/result/result.component';
import { SplitterComponent } from './components/splitter/splitter.component';

@NgModule({
  declarations: [
    AppComponent,
    SplitterComponent,
    BillInfoComponent,
    ResultComponent,
    AmountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
