import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CategoryEnum, CountryEnum } from '@domain';
import { RootStateModel, TopFilterStateModel, topArticlesActions, uiActions } from '@state';

@Component({
  selector: 'news-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.scss']
})
export class TopFilterComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder,
  ) {}

  private subscription: Subscription;
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
        && (!state.sources || !state.sources.length)
  }

  public ngOnInit(): void {
    const stateSubscription = this.store
      .select(state => state.top.filter)
      .subscribe(filterState => {
        this.subscription = this.setupFormGroup(filterState);
      });
    stateSubscription.unsubscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public closeFilter(): void {
    this.store.dispatch(uiActions.toggleFilter({ opened: false }));
  }

  public clearFilter(): void {
    this.formGroup.setValue(new TopFilterStateModel())
  }

  public applyFilter(): void {
    this.filter.emit(this.formGroup.value);
  }

  private setupFormGroup(filterState: TopFilterStateModel): Subscription {
    this.formGroup = this.formBuilder.group({
      category: [filterState.category],
      country: [filterState.country],
      sources: [filterState.sources],
      searchString: [filterState.searchString]
    });
    this.formGroup.get('sources').disable();
    return this.formGroup.valueChanges.subscribe(filterState => {
      this.store.dispatch(topArticlesActions.storeFilter({ filterState }));
    });
  }

  private toOptionList(enumType: any): any[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }
}