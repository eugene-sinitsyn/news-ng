import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { preferencesActions } from '../actions/preferences.actions';
import { concatMap } from 'rxjs/operators';
import { PreferencesStorageService } from '@storage';

@Injectable()
export class PreferencesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly preferencesStorageService: PreferencesStorageService
  ) {}

  public readonly savePreferencesToStorage$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.savePreferencesToStorage),
      concatMap(action => {
        const preferences = action.preferences;
        this.preferencesStorageService.store(preferences);
        return of(preferencesActions.storePreferences({ preferences }));
      })
    )
  );

  public readonly readSavedPreferences$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.readSavedPreferences),
      concatMap(() => {
        const preferences = this.preferencesStorageService.get();
        return of(preferencesActions.storePreferences({ preferences }));
      })
    )
  );

  public readonly readSavedPreferencesImmediately$ = createEffect(
    () => defer(() => of(preferencesActions.readSavedPreferences()))
  );
}