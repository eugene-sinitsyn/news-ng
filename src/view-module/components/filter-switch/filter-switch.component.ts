import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { IconDefinition, faFilter, faSave, faFolderOpen, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { RootStateModel, topArticlesActions } from '@state';
import { uiActions } from '@state';
import { ViewConfiguration } from '@view/config';
import { FilterListDialogComponent } from '../filter-list-dialog/filter-list-dialog.component';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'news-filter-switch',
  templateUrl: './filter-switch.component.html',
  styleUrls: ['./filter-switch.component.scss']
})
export class FilterSwitchComponent implements OnInit, OnDestroy {
  public constructor(
    public readonly viewConfig: ViewConfiguration,
    private readonly store: Store<RootStateModel>,
    private readonly translateService: TranslateService,
    private readonly dialogService: MatDialog,
  ) {}

  private readonly subscription: Subscription = new Subscription();
  private filterIsOpened: boolean;

  public readonly faFilter: IconDefinition = faFilter;
  public readonly faEllipsisV: IconDefinition = faEllipsisV;
  public readonly faSave: IconDefinition = faSave;
  public readonly faFolderOpen: IconDefinition = faFolderOpen;

  @HostBinding('class.focused') public focusedClass: boolean = false;
  public filterIsApplied: boolean = false;

  public get tooltipText(): string {
    let label: string;
    if (this.filterIsApplied) label = 'filter-applied';
    else if (this.filterIsOpened) label = 'filter-close';
    else label = 'filter-open';
    return this.translateService.instant(`header.${label}`);
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.ui.filterOpened)
        .subscribe(opened => this.filterIsOpened = opened)
    );
    this.subscription.add(
      this.store.select(state => state.top.filter)
        .subscribe(filter => this.filterIsApplied = !!filter)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleFocusedClass(focused: boolean): void {
    this.focusedClass = focused;
  }

  public toggleFilter(): void {
    const opened = !this.filterIsOpened;
    this.store.dispatch(uiActions.toggleFilter({ opened }));
  }

  public openFilterListDialog(): void {
    this.dialogService.open(FilterListDialogComponent);
  }

  public openFilterNameDialog(): void {
    const subscription = this.dialogService
      .open(InputDialogComponent, { data: 'filter.enter-name' })
      .afterClosed()
      .subscribe(filterName => {
        subscription.unsubscribe();
        if (filterName) this.store.dispatch(
          topArticlesActions.saveFilterToStorage({ filterName })
        );
      });
  }
}