import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IconDefinition, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, Subscription } from 'rxjs';
import { ViewConfiguration } from '@view/config';

@Component({
  selector: 'news-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnDestroy {
  public constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly ngZone: NgZone,
    public readonly viewConfig: ViewConfiguration
  ) {
    this.body = document.body;
  }

  private readonly body: HTMLElement;
  private readonly infiniteScrollTolerance: number = 100; // px
  private readonly scrollToTopTolerance: number = 1024; // px
  private subscription: Subscription = new Subscription();
  private infiniteScrollEnabled: boolean = true;

  public readonly faLongArrowAltUp: IconDefinition = faLongArrowAltUp;
  public scrollToTopVisible: boolean = false;

  @Input() public totalCount: number = 0;
  @Input() public visibleCount: number = 0;
  @Input() public set infinite(value: any) {
    this.infiniteScrollEnabled = coerceBooleanProperty(value);
  }

  @Output() public readonly showMore: EventEmitter<void> = new EventEmitter<void>();

  public get moreAvailable(): boolean {
    return this.totalCount && this.totalCount > this.visibleCount;
  }

  public ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.subscription.add(
        fromEvent(this.body, 'scroll').subscribe(() => {
          this.updateScrollToTopButton();
          if (this.infiniteScrollEnabled) this.handleInfiniteScrolling();
        })
      )
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public scrollToTop(): void {
    this.body.scrollTo({ top: 0 });
  }

  private updateScrollToTopButton(): void {
    const shouldBeVisible = this.body.scrollTop > this.scrollToTopTolerance;
    if (shouldBeVisible !== this.scrollToTopVisible)
      this.ngZone.run(() => this.scrollToTopVisible = shouldBeVisible);
  }

  private handleInfiniteScrolling(): Subscription {
    if (!this.moreAvailable) return;
    const distanceToBottom = this.getDistanceToBottom();
    if (distanceToBottom < this.infiniteScrollTolerance)
      this.ngZone.run(() => this.showMore.emit());
  }

  private getDistanceToBottom(): number {
    const scrollBottom = this.body.scrollTop + this.body.clientHeight;
    const scrollHeight = this.body.scrollHeight;
    return scrollHeight - scrollBottom;
  }
}