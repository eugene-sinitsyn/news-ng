import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { RootStateModel } from '@state';
import { uiActions } from '@state';
import { ViewConfiguration } from '@view/config';

@Component({
  selector: 'news-filter-switch',
  templateUrl: './filter-switch.component.html',
  styleUrls: ['./filter-switch.component.scss']
})
export class FilterSwitchComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    public readonly viewConfig: ViewConfiguration
  ) {}

  private subscription: Subscription;
  private filterIsOpened: boolean;
  public readonly faFilter: IconDefinition = faFilter;
  public filterBadgeIsVisible: boolean = false;

  public get tooltipText(): string {
    if (this.filterBadgeIsVisible) return 'Filter is applied';
    else if (this.filterIsOpened) return 'Close filter';
    else return 'Open filter';
  }

  public ngOnInit(): void {
    this.subscription = this.store
      .select(state => state.ui.filterOpened)
      .subscribe(opened => this.filterIsOpened = opened);
    this.subscription.add(this.store
      .select(state => state.ui.filterBadgeVisible)
      .subscribe(visible => this.filterBadgeIsVisible = visible)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public toggleFilter(): void {
    const opened = !this.filterIsOpened;
    this.store.dispatch(uiActions.toggleFilter({ opened }));
  }
}