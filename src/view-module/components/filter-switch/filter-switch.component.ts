import { Component, OnInit, OnDestroy } from '@angular/core';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { RootStateModel } from '@state';
import { Subscription } from 'rxjs';
import { uiActions } from '@state';

@Component({
  selector: 'news-filter-switch',
  templateUrl: './filter-switch.component.html',
  styleUrls: ['./filter-switch.component.scss']
})
export class FilterSwitchComponent implements OnInit, OnDestroy {
  public constructor(private readonly store: Store<RootStateModel>) {}

  private subscription: Subscription;
  private filterOpened: boolean;
  public readonly faFilter: IconDefinition = faFilter;

  public ngOnInit(): void {
    this.subscription = this.store
      .select(state => state.ui.filterOpened)
      .subscribe(opened => this.filterOpened = opened);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public toggleFilter(): void {
    const opened = !this.filterOpened;
    this.store.dispatch(uiActions.toggleFilter({ opened }));
  }
}