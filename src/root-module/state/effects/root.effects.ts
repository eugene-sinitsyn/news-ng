import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import {
  PreferencesStorageService
} from '../../services/local-storage/preferences-storage.service';
import {
  ReadLaterStorageService
} from '../../services/local-storage/read-later-storage.service';
import {
  TopFiltersStorageService
} from '../../services/local-storage/top-filters-storage.service';
import { preferencesActions } from '../actions/preferences.actions';
import { readLaterActions } from '../actions/read-later.actions';
import { rootActions } from '../actions/root.actions';
import { topActions } from '../actions/top.actions';
import { TopFilterStateModel } from '../models/top-filter-state.model';

@Injectable()
export class RootEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly preferencesStorageService: PreferencesStorageService,
    private readonly topFiltersStorageService: TopFiltersStorageService,
    private readonly readLaterStorageService: ReadLaterStorageService
  ) {}

  public readonly readStateFromStorage: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(rootActions.readStateFromStorage),
      concatMap(() => {
        const preferences = this.preferencesStorageService.get();
        const filters = this.topFiltersStorageService.get();
        const articles = this.readLaterStorageService.get();

        const actions: Action[] = [
          topActions.storeFilters({ filters }),
          readLaterActions.storeArticles({ articles }),
          preferencesActions.storePreferences({ preferences })
        ];

        const defaultFilter = preferences.defaultTopFilterName &&
          filters[preferences.defaultTopFilterName];
        const filterState = defaultFilter && new TopFilterStateModel(defaultFilter)
        if (filterState) actions.push(topActions.storeFilter({ filterState }));

        return of(...actions);
      })
    )
  );

  public readonly readFromStorageImmediately$: Observable<Action> = createEffect(
    () => defer(() => of(rootActions.readStateFromStorage()))
  );
}