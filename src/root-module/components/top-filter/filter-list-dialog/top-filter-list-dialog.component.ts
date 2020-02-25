import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TopFiltersDictionary } from '../../../models/top-filters-dictionary.model';
import { preferencesActions } from '../../../state/actions/preferences.actions';
import { topActions } from '../../../state/actions/top.actions';
import { RootStateModel } from '../../../state/models/root-state.model';
import { TopFilterStateModel } from '../../../state/models/top-filter-state.model';

@Component({
  selector: 'news-top-filter-list-dialog',
  templateUrl: './top-filter-list-dialog.component.html',
  styleUrls: ['./top-filter-list-dialog.component.scss']
})
export class TopFilterListDialogComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly dialogRef: MatDialogRef<TopFilterListDialogComponent>
  ) {}

  private readonly subscription: Subscription = new Subscription();

  public readonly faTrash: IconDefinition = faTrash;
  public filters: TopFiltersDictionary = {};

  public get title(): string {
    return !this.filters || !this.filterNames.length
      ? 'filter.no-saved-filters'
      : 'filter.saved-filters';
  }

  public get filterNames(): string[] {
    return this.filters ? Object.keys(this.filters) : [];
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.top.savedFilters)
        .subscribe(filters => this.filters = filters)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public applyFilter(filterName: string): void {
    const language = this.filters[filterName].language;
    const filterState = new TopFilterStateModel(this.filters[filterName]);

    this.store.dispatch(preferencesActions.storeLanguage({ language }));
    this.store.dispatch(topActions.storeFilter({ filterState }));
    this.store.dispatch(topActions.fetchArticles());

    this.dialogRef.close();
  }

  public deleteFilter(filterName: string): void {
    this.store.dispatch(topActions.deleteFilter({ filterName }));
  }
}