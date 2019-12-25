import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryEnum, CountryEnum } from '@domain';
import { RootStateModel, TopFilterStateModel, uiActions, topArticlesActions } from '@state';

@Component({
  selector: 'news-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.scss']
})
export class TopFilterComponent implements OnInit {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder,
  ) {}

  public readonly categories: any[] = this.toOptionList(CategoryEnum);
  public readonly countries: any[] = this.toOptionList(CountryEnum);
  public formGroup: FormGroup;

  @Output() public readonly filter: EventEmitter<TopFilterStateModel> =
    new EventEmitter<TopFilterStateModel>();

  public get formIsEmpty(): boolean {
    if (!this.formGroup) return true;
    const state: TopFilterStateModel = this.formGroup.value;
    return !state.category
        && !state.country
        && !state.searchString
        && (!state.sources || !state.sources.length);
  }

  public ngOnInit(): void {
    const stateSubscription = this.store
      .select(state => state.top.filter)
      .subscribe(filterState => this.setupFormGroup(filterState));
    stateSubscription.unsubscribe();
  }

  public closeFilter(): void {
    this.store.dispatch(uiActions.toggleFilter({ opened: false }));
  }

  public clearFilter(): void {
    this.formGroup.setValue(new TopFilterStateModel());
    this.formGroup.markAsDirty();
  }

  public applyFilter(): void {
    const filterState = this.formIsEmpty ? null : this.formGroup.value;
    this.filter.emit(filterState);
    this.store.dispatch(uiActions.toggleFilterBadge({ visible: !!filterState }));
    this.store.dispatch(
      topArticlesActions.storeFilter({ filterState: this.formGroup.value })
    );
    this.closeFilter();
  }

  private setupFormGroup(filterState: TopFilterStateModel): void {
    this.formGroup = this.formBuilder.group({
      category: [filterState.category],
      country: [filterState.country],
      sources: [filterState.sources],
      searchString: [filterState.searchString]
    });
    this.formGroup.get('sources').disable();
  }

  private toOptionList(enumType: any): any[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }
}