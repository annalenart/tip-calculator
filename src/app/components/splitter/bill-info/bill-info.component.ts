import { ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { BillData } from '../splitter.component';

interface TipData {
  displayTip: string;
  tipAmount: number;
}

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class BillInfoComponent implements OnInit {
  private static readonly PREDEFINED_TIPS = [
    {displayTip: '5', tipAmount: 0.05},
    {displayTip: '10', tipAmount: 0.1},
    {displayTip: '15', tipAmount: 0.15},
    {displayTip: '25', tipAmount: 0.25},
    {displayTip: '50', tipAmount: 0.5}
  ];

  @Output() billDataChanged = new EventEmitter<BillData>();
  @ViewChild('billInput') billInput: ElementRef;
  @ViewChild('peopleInput') peopleInput: ElementRef;

  billData: BillData = {
    bill: 0,
    tip: 0,
    people: 0
  } as BillData;

  isCustom = false;
  tips: Array<TipData>;

  ngOnInit(): void {
    this.tips = BillInfoComponent.PREDEFINED_TIPS;
  }

  toggle() {
    this.isCustom = !this.isCustom;
  }

  updateBillData(billElement: keyof BillData, amount: string | number): void {
    this.billData[billElement] = +amount;
    this.billData.bill && this.billData.tip && this.billData.people && this.billDataChanged.emit(this.billData);
  }

  reset(): void {
    Object.keys(this.billData).forEach((key: string) => {
      this.billData[key as keyof BillData] = 0;
    });
    this.billDataChanged.emit(this.billData);
    this.billInput.nativeElement.value = '';
    this.peopleInput.nativeElement.value = '';
    this.isCustom = false;
  }

}
