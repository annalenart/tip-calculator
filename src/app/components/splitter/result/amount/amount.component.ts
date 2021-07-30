import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  @Input() amount: number;
  @Input() title: string;

  ngOnInit(): void {
    this.amount = 0;
  }

}
