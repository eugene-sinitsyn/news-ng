import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators'
import { PageSizeEnum, LanguageEnum, UtilitiesService } from '@domain';
import { RootStateModel, preferencesActions } from '@state';
import { PreferencesFormService } from '../../../services/preferences-form.service';
import { ConfirmDialogComponent } from '../../dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'news-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss']
})
export class PreferencesFormComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formService: PreferencesFormService,
    private readonly dialogService: MatDialog
  ) {}

  private readonly subscription: Subscription = new Subscription();
  public readonly languages: string[] = UtilitiesService.enumToList(LanguageEnum);
  public readonly pageSizes: PageSizeEnum[] = UtilitiesService.enumToList(PageSizeEnum);
  public filterNames: string[] = [];
  public formGroup: FormGroup;

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.preferences).pipe(
        withLatestFrom(this.store.select(state => state.top.savedFilters))
      ).subscribe(([preferences, savedFilters]) => {
        this.filterNames = Object.keys(savedFilters);
        this.formGroup = this.formService.buildForm(preferences);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public save(): void {
    const preferences = this.formGroup.value;
    this.store.dispatch(preferencesActions.storePreferences({ preferences }));
    this.store.dispatch(preferencesActions.savePreferencesToStorage());
  }

  public confirmClearStorage(): void {
    const subscription =  this.dialogService
      .open(ConfirmDialogComponent, { data: 'preferences.confirm-clear' })
      .afterClosed()
      .subscribe(confirmed => {
        subscription.unsubscribe();
        if (confirmed) this.store.dispatch(preferencesActions.clearUserData());
      });
  }
}