import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BillData } from '../splitter.component';

interface TipData {
  tipAmount: number;
}

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class BillInfoComponent implements OnInit, OnDestroy {
  private static readonly PREDEFINED_TIPS = [
    {tipAmount: 5},
    {tipAmount: 10},
    {tipAmount: 15},
    {tipAmount: 25},
    {tipAmount: 50}
  ];

  @Output() billDataChanged = new EventEmitter<BillData>();
  @ViewChild('billInput') billInput: ElementRef;
  @ViewChild('peopleInput') peopleInput: ElementRef;

  form: FormGroup;
  formSub: Subscription;

  isCustom = false;
  tips: Array<TipData>;

  ngOnInit(): void {
    this.tips = BillInfoComponent.PREDEFINED_TIPS;
    this.form = new FormGroup({
      bill: new FormControl(null, [Validators.required, BillInfoComponent.range()]),
      people: new FormControl(null, [Validators.required, BillInfoComponent.range()]),
      tip: new FormControl(null, Validators.required)
    });
    this.formSub = this.form.valueChanges.subscribe((billData: BillData) => {
      billData.tip = this.form.controls.tip.value/100;
      this.form.valid && this.billDataChanged.emit(billData);
    });
  }

  ngOnDestroy(): void {
    this.formSub && this.formSub.unsubscribe();
  }

  toggle() {
    this.isCustom = !this.isCustom;
    this.isCustom && this.form.controls.tip.setValue(null)
  }

  updateTip(amount: number): void {
    this.form.controls.tip.setValue(amount);
  }

  reset(): void {
    this.form.reset();
    this.isCustom = false;
  }

  private static range(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (+control.value === 0) {
        return {'forbiddenZero': true};
      } else if (+control.value < 0) {
        return {'forbiddenNegative': true};
      }
      return null;
    };
  }
}
