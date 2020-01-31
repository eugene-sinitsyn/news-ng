import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'news-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() public loaded: number = 0;
  @Input() public total: number = 0;
  @Output() public readonly loadMore: EventEmitter<void> = new EventEmitter<void>();

  public get status(): { loaded: number; total: number } {
    return { loaded: this.loaded, total: this.total };
  }

  public get loadAvailable(): boolean {
    return this.total && this.loaded < this.total;
  }
}