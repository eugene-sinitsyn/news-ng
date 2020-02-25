import {
  Component,
  HostBinding,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {
  IconDefinition,
  faFilter,
  faSave,
  faFolderOpen,
  faEllipsisV,
  faEraser
} from '@fortawesome/free-solid-svg-icons';
import { InputDialogComponent } from '../../dialog/input/input-dialog.component';
import { TopFilterListDialogComponent } from '../filter-list-dialog/top-filter-list-dialog.component';
import { RootConfig } from '../../../root.config';
import { RootStateModel } from '../../../state/models/root-state.model';
import { topActions } from '../../../state/actions/top.actions';

@Component({
  selector: 'news-top-filter-switch',
  templateUrl: './top-filter-switch.component.html',
  styleUrls: ['./top-filter-switch.component.scss']
})
export class TopFilterSwitchComponent {
  public constructor(
    public readonly rootConfig: RootConfig,
    private readonly store: Store<RootStateModel>,
    private readonly translateService: TranslateService,
    private readonly dialogService: MatDialog
  ) {}

  public readonly faFilter: IconDefinition = faFilter;
  public readonly faEllipsisV: IconDefinition = faEllipsisV;
  public readonly faSave: IconDefinition = faSave;
  public readonly faFolderOpen: IconDefinition = faFolderOpen;
  public readonly faEraser: IconDefinition = faEraser;

  @HostBinding('class.menu-action-border') public readonly borderClass: boolean = true;
  @HostBinding('class.focused') public focusedClass: boolean = false;
  @Input() public filterOpened: boolean = false;
  @Input() public filterApplied: boolean = false;
  @Output() public readonly toggle: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public get tooltipText(): string {
    let label: string;
    if (this.filterApplied) label = 'filter-applied';
    else if (this.filterOpened) label = 'filter-close';
    else label = 'filter-open';
    return this.translateService.instant(`header.${label}`);
  }

  public toggleFocusedClass(focused: boolean): void {
    this.focusedClass = focused;
  }

  public toggleFilter(): void {
    this.toggle.emit(!this.filterOpened);
  }

  public openFilterListDialog(): void {
    this.dialogService.open(TopFilterListDialogComponent);
  }

  public openFilterNameDialog(): void {
    const subscription = this.dialogService
      .open(InputDialogComponent, { data: 'filter.enter-name' })
      .afterClosed()
      .subscribe(filterName => {
        subscription.unsubscribe();
        if (filterName) this.store.dispatch(
          topActions.saveFilter({ filterName })
        );
      });
  }

  public clearFilter(): void {
    this.store.dispatch(topActions.storeFilter({ filterState: null }));
    this.store.dispatch(topActions.fetchArticles());
  }
}