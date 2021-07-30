import { Component, ViewChild } from '@angular/core';
import { BillInfoComponent } from './bill-info/bill-info.component';

export interface BillData {
  bill: number;
  tip: number;
  people: number;
}

@Component({
  selector: 'app-splitter',
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.scss']
})
export class SplitterComponent {
  @ViewChild('billInfo') billInfo: BillInfoComponent;

  tipAmount: number;
  total: number;

  billDataChanged(billData: BillData) {
    if (!billData.bill && !billData.tip && !billData.people) {
      this.tipAmount = 0;
      this.total = 0;
    } else {
      this.tipAmount = +((billData.bill / billData.people) * billData.tip).toFixed(2);
      this.total = +(billData.bill / billData.people + this.tipAmount).toFixed(2);
    }
  }

  onReset() {
    this.billInfo.reset();
  }
}
