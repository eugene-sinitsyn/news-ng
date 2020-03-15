import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

import { TopFilterStateModel } from '../../state/models/top-filter-state.model';

@Injectable()
export class TopFilterFormService {
  public constructor(private readonly formBuilder: FormBuilder) {}

  public buildForm(
    filterState: TopFilterStateModel
  ): { formGroup: FormGroup, subscription: Subscription } {
    if (!filterState) filterState = new TopFilterStateModel();

    const formGroup = this.formBuilder.group({
      category: [filterState.category],
      country: [filterState.country],
      sources: [filterState.sources],
      searchString: [filterState.searchString]
    });

    const subscription = merge(
      formGroup.get('country').valueChanges,
      formGroup.get('category').valueChanges
    ).subscribe(() => formGroup.get('sources').setValue([]));

    return {formGroup, subscription };
  }
}