import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { preferencesActions } from '../actions/preferences.actions';
import { withLatestFrom, tap } from 'rxjs/operators';
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
}