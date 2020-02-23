import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MatDialogRef } from '@angular/material/dialog';
import { TopFiltersDictionary } from '@domain';
import { Store } from '@ngrx/store';
import { RootStateModel, topActions, TopFilterStateModel, preferencesActions } from '@state';
import { Subscription } from 'rxjs';

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
      : 'filter.select-filter';
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