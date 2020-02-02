import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit,
  NgZone,
  OnDestroy
} from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'news-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnDestroy {
  public constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly ngZone: NgZone
  ) {
    this.body = document.body;
  }

  private readonly body: HTMLElement;
  private readonly infiniteScrollTolerance: number = 100; // px
  private scrollSubscription: Subscription;

  @Input() public totalCount: number = 0;
  @Input() public visibleCount: number = 0;
  @Input() public set infinite(value: any) {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
    const infiniteScrollEnabled = coerceBooleanProperty(value);
    if (infiniteScrollEnabled) this.ngZone.runOutsideAngular(() => {
      this.scrollSubscription = this.subscribeToScroll();
    });
  }

  @Output() public readonly showMore: EventEmitter<void> = new EventEmitter<void>();

  public get moreAvailable(): boolean {
    return this.totalCount && this.totalCount > this.visibleCount;
  }

  public ngOnDestroy(): void {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }

  private subscribeToScroll(): Subscription {
    return fromEvent(this.body, 'scroll').subscribe(() => {
      if (!this.moreAvailable) return;
      const distanceToBottom = this.getDistanceToBottom();
      if (distanceToBottom < this.infiniteScrollTolerance)
        this.ngZone.run(() => this.showMore.emit());
    });
  }

  private getDistanceToBottom(): number {
    const scrollBottom = this.body.scrollTop + this.body.clientHeight;
    const scrollHeight = this.body.scrollHeight;
    return scrollHeight - scrollBottom;
  }
}