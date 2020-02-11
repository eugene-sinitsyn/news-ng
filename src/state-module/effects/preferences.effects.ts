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

  public readonly readSavedPreferences$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.readSavedPreferences),
      concatMap(() => this.mapToStorePreferencesAction())
    )
  );

  public readonly readSavedPreferencesImmediately$ = createEffect(
    () => defer(() => of(preferencesActions.readSavedPreferences()))
  );

  private mapToStorePreferencesAction(): Observable<Action> {
    const preferences = this.preferencesStorageService.get();
    return of(preferencesActions.storePreferences({ preferences }));
  }
}