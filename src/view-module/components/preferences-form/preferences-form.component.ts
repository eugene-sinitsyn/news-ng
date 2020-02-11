import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators'
import { PageSizeEnum, LanguageEnum, NotificationEnum } from '@domain';
import { RootStateModel, preferencesActions, uiActions } from '@state';
import { PreferencesFormService } from '../../services/preferences-form.service';

@Component({
  selector: 'news-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss']
})
export class PreferencesFormComponent implements OnInit {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formService: PreferencesFormService
  ) {}

  public readonly languages: string[] =
    Object.keys(LanguageEnum).map(key => LanguageEnum[key]);
  public readonly pageSizes: PageSizeEnum[] =
    [PageSizeEnum.small, PageSizeEnum.medium, PageSizeEnum.large];
  public formGroup: FormGroup;

  public ngOnInit(): void {
    const preferencesSubscription = this.store
      .select(state => state.preferences)
      .pipe(delay(0)) // execute subscription in separate task
      .subscribe(preferences => {
        preferencesSubscription.unsubscribe();
        this.formGroup = this.formService.buildForm(preferences);
      })
  }

  public save(): void {
    const preferences = this.formGroup.value;
    this.store.dispatch(preferencesActions.savePreferencesToStorage({ preferences }));
    this.store.dispatch(uiActions.notify({ label: NotificationEnum.saved }));
    this.formGroup.markAsPristine();
  }
}