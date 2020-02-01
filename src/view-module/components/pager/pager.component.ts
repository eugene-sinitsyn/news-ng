import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'news-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() public total: number = 0;
  @Input() public visible: number = 0;
  @Output() public readonly showMore: EventEmitter<void> = new EventEmitter<void>();

  public get moreAvailable(): boolean {
    return this.total && this.total > this.visible;
  }
}