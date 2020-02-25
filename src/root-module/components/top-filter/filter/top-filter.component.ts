import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { merge, Subscription } from 'rxjs';

import { CategoryEnum } from '../../../enums/category.enum';
import { CountryEnum } from '../../../enums/country.enum';
import { UtilitiesService } from '../../../services/utilities.service';
import { topActions } from '../../../state/actions/top.actions';
import { RootStateModel } from '../../../state/models/root-state.model';
import { TopFilterStateModel } from '../../../state/models/top-filter-state.model';

@Component({
  selector: 'news-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.scss']
})
export class TopFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder
  ) {}

  @Output() public readonly close: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('searchString') public searchStringControl: ElementRef;

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

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.searchStringControl) this.searchStringControl.nativeElement.focus();
    });
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

  public tryApplyFilter(): void {
    if (this.formGroup.dirty) this.applyFilter();
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