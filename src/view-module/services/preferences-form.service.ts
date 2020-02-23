import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesStateModel } from '@state';

@Injectable()
export class PreferencesFormService {
  public constructor(private readonly formBuilder: FormBuilder) {}

  public buildForm(preferences: PreferencesStateModel): FormGroup {
    return this.formBuilder.group({
      language: [preferences.language],
      defaultTopFilterName: [preferences.defaultTopFilterName],
      pageSize: [preferences.pageSize],
      infiniteScroll: [preferences.infiniteScroll],
      darkTheme: [preferences.darkTheme]
    });
  }
}