import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { preferencesActions } from '../actions/preferences.actions';
import { mergeMap } from 'rxjs/operators';
import { sourcesActions } from '../actions/sources.actions';

@Injectable()
export class PreferencesEffects {
  public constructor(
    private readonly actions$: Actions
  ) {}

  public readonly storeLanguage$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.storeLanguage),
      mergeMap(() => of(sourcesActions.storeSources({ sources: [] })))
    )
  );
}