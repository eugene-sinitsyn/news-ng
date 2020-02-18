import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { preferencesActions } from '../actions/preferences.actions';
import { concatMap, withLatestFrom, tap } from 'rxjs/operators';
import { PreferencesStorageService } from '@storage';
import { RootStateModel } from '../models/root-state.model';

@Injectable()
export class PreferencesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootStateModel>,
    private readonly preferencesStorageService: PreferencesStorageService
  ) {}

  public readonly savePreferencesToStorage$: Observable<any> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.savePreferencesToStorage),
      withLatestFrom(this.store.select(state => state.preferences)),
      tap(([action, preferences]) => this.preferencesStorageService.store(preferences))
    ),
    { dispatch: false }
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