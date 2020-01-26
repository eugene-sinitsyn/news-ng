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

  @Output() public readonly close: EventEmitter<void> = new EventEmitter<void>();

  public readonly categories: any[] = this.toOptionList(CategoryEnum);
  public readonly countries: any[] = this.toOptionList(CountryEnum);
  public formGroup: FormGroup;

  public get formIsEmpty(): boolean {
    if (!this.formGroup) return true;
    else return new TopFilterStateModel(this.formGroup.value).isEmpty;
  }

  public get selectedCountry(): CountryEnum {
    return this.formGroup ? this.formGroup.get('country').value : null;
  }

  public get selectedCategory(): CategoryEnum {
    return this.formGroup ? this.formGroup.get('category').value : null;
  }

  public ngOnInit(): void {
    const stateSubscription = this.store
      .select(state => state.top.filter)
      .subscribe(filterState => this.setupFormGroup(filterState));
    stateSubscription.unsubscribe();
  }

  public closeFilter(): void {
    this.close.emit();
  }

  public clearFilter(): void {
    this.formGroup.setValue(new TopFilterStateModel());
    this.formGroup.markAsDirty();
  }

  public applyFilter(): void {
    let filterState = new TopFilterStateModel(this.formGroup.value);
    if (filterState.isEmpty) filterState = null;
    this.store.dispatch(topArticlesActions.storeFilter({ filterState }));
    this.store.dispatch(topArticlesActions.fetchArticles());
    this.closeFilter();
  }

  public fetchSources(opened: boolean): void {
    console.log(opened);
  }

  private setupFormGroup(filterState: TopFilterStateModel): void {
    if (!filterState) filterState = new TopFilterStateModel();
    this.formGroup = this.formBuilder.group({
      category: [filterState.category],
      country: [filterState.country],
      sources: [filterState.sources],
      searchString: [filterState.searchString]
    });
  }

  private toOptionList(enumType: any): any[] {
    return Object.keys(enumType).map(key => enumType[key]);
  }
}