import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, withLatestFrom } from 'rxjs/operators';

import { NotificationEnum } from '../../enums/notification.enum';
import {
  PreferencesStorageService
} from '../../services/local-storage/preferences-storage.service';
import { preferencesActions } from '../actions/preferences.actions';
import { readLaterActions } from '../actions/read-later.actions';
import { topActions } from '../actions/top.actions';
import { uiActions } from '../actions/ui.actions';
import { RootStateModel } from '../models/root-state.model';
import { defaultPreferences } from '../reducers/preferences.reducer';

@Injectable()
export class PreferencesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootStateModel>,
    private readonly preferencesStorageService: PreferencesStorageService,
  ) {}

  public readonly savePreferencesToStorage$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.savePreferencesToStorage),
      withLatestFrom(this.store.select(state => state.preferences)),
      concatMap(([action, preferences]) => {
        this.preferencesStorageService.store(preferences);
        return of(uiActions.notify({ label: NotificationEnum.saved }));
      })
    )
  );

  public readonly clearUserData$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(preferencesActions.clearUserData),
      concatMap(() => {
        this.preferencesStorageService.delete();
        return of(
          topActions.storeFilters({ filters: {} }),
          topActions.saveFiltersToStorage(),
          readLaterActions.storeArticles({ articles: [] }),
          readLaterActions.saveArticlesToStorage(),
          preferencesActions.storePreferences({ preferences: defaultPreferences }),
          uiActions.notify({ label: NotificationEnum.removed })
        );
      })
    )
  );
}