import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { merge, Subscription } from 'rxjs';
import { RootStateModel } from '../../../state/models/root-state.model';
import { UtilitiesService } from '../../../services/utilities.service';
import { CategoryEnum } from '../../../enums/category.enum';
import { CountryEnum } from '../../../enums/country.enum';
import { TopFilterStateModel } from '../../../state/models/top-filter-state.model';
import { topActions } from '../../../state/actions/top.actions';

@Component({
  selector: 'news-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.scss']
})
export class TopFilterComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder
  ) {}

  @Output() public readonly close: EventEmitter<void> = new EventEmitter<void>();

  private formSubscription: Subscription;
  public readonly categories: any[] = UtilitiesService.enumToList(CategoryEnum);
  public readonly countries: any[] = UtilitiesService.enumToList(CountryEnum);
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

  public ngOnDestroy(): void {
    if (this.formSubscription) this.formSubscription.unsubscribe();
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
    this.store.dispatch(topActions.storeFilter({ filterState }));
    this.store.dispatch(topActions.fetchArticles());
  }

  private setupFormGroup(filterState: TopFilterStateModel): void {
    if (!filterState) filterState = new TopFilterStateModel();
    this.formGroup = this.formBuilder.group({
      category: [filterState.category],
      country: [filterState.country],
      sources: [filterState.sources],
      searchString: [filterState.searchString]
    });

    if (this.formSubscription) this.formSubscription.unsubscribe();
    this.formSubscription = merge(
      this.formGroup.get('country').valueChanges,
      this.formGroup.get('category').valueChanges
    ).subscribe(() => this.formGroup.get('sources').setValue([]));
  }
}