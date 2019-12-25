import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { RootStateModel, TopFilterStateModel, topArticlesActions, uiActions } from '@state';
import { CategoryEnum, CountryEnum } from '@domain';

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
    // TODO: implement
  }

  public applyFilter(): void {
    // TODO: implement
    console.dir(this.formGroup.value);
  }

  private setupFormGroup(filterState: TopFilterStateModel): Subscription {
    this.formGroup = this.formBuilder.group({
      category: [filterState.category],
      country: [filterState.country],
      sources: [filterState.sources],
      searchString: [filterState.searchString]
    });
    return this.formGroup.valueChanges.subscribe(filterState => {
      this.store.dispatch(topArticlesActions.storeFilter({ filterState }));
    });
  }

  private toOptionList(enumType: any): any[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }
}