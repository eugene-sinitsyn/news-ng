import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, defer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import {
  PreferencesStorageService,
  TopFiltersStorageService,
  ReadLaterStorageService
} from '@storage';
import { TopFilterStateModel } from '../models/top-filter-state.model';
import { rootActions } from '../actions/root.actions';
import { preferencesActions } from '../actions/preferences.actions';
import { readLaterActions } from '../actions/read-later.actions';
import { topActions } from '../actions/top.actions';

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
          preferencesActions.storePreferences({ preferences }),
          topActions.storeFilters({ filters }),
          readLaterActions.storeArticles({ articles })
        ];

        const defaultFilter = preferences.defaultTopFilterName &&
          filters[preferences.defaultTopFilterName];
        if (defaultFilter) {
          const filterState = new TopFilterStateModel(defaultFilter);
          actions.push(topActions.storeFilter({ filterState }));
        }

        return of(...actions);
      })
    )
  );

  public readonly readFromStorageImmediately$: Observable<Action> = createEffect(
    () => defer(() => of(rootActions.readStateFromStorage()))
  );
}