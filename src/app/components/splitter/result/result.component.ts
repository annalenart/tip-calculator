import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() tipAmount: number;
  @Input() total: number;
  @Output() resetTriggered = new EventEmitter<void>();

  reset() {
    this.resetTriggered.emit();
    this.tipAmount = 0;
    this.total = 0;
  }
}
