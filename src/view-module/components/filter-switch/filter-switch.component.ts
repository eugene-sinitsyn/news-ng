import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    public readonly viewConfig: ViewConfiguration,
    private readonly store: Store<RootStateModel>,
    private translateService: TranslateService,
  ) {}

  private subscription: Subscription;
  private filterIsOpened: boolean;
  public readonly faFilter: IconDefinition = faFilter;
  public filterIsApplied: boolean = false;

  public get tooltipText(): string {
    let label: string;
    if (this.filterIsApplied) label = 'filter-applied';
    else if (this.filterIsOpened) label = 'filter-close';
    else label = 'filter-open';
    return this.translateService.instant(`header.${label}`);
  }

  public ngOnInit(): void {
    this.subscription = this.store
      .select(state => state.ui.filterOpened)
      .subscribe(opened => this.filterIsOpened = opened);
    this.subscription.add(this.store
      .select(state => state.top.filter)
      .subscribe(filter => this.filterIsApplied = !!filter));
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