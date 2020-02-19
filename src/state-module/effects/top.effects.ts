import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { withLatestFrom, tap, concatMap, map } from 'rxjs/operators';
import { TopArticlesRequestModel, NotificationEnum } from '@domain';
import { ArticlesService } from '@network';
import { TopFiltersStorageService } from '@storage';
import { topActions } from '../actions/top.actions';
import { RootStateModel } from '../models/root-state.model';
import { uiActions } from '../actions/ui.actions';
import { preferencesActions } from '../actions/preferences.actions';

@Injectable()
export class TopArticlesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootStateModel>,
    private readonly articlesService: ArticlesService,
    private readonly topFiltersStorageService: TopFiltersStorageService
  ) {}

  public readonly fetchTopArticles$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topActions.fetchArticles),
      withLatestFrom(this.store),
      concatMap(([action, state]) => {
        const request = this.toTopArticlesRequest(state);
        return this.articlesService.fetchTop(request)
          .then(articles => topActions.storeArticles({ articles }));
          // TODO: .catch(error => )
      })
    )
  );

  public readonly saveFilter$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topActions.saveFilter),
      map(action => action.filterName),
      withLatestFrom(this.store),
      concatMap(([filterName, state]) => {
        const filter = this.toTopArticlesRequest(state);
        const filters = { ...state.top.savedFilters };
        filters[filterName] = filter;
        return of(
          topActions.storeFilters({ filters }),
          topActions.saveFiltersToStorage(),
          uiActions.notify({ label: NotificationEnum.saved })
        );
      })
    )
  );

  public readonly deleteFilter$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topActions.deleteFilter),
      map(action => action.filterName),
      withLatestFrom(this.store),
      concatMap(([filterName, state]) => {
        const filters = { ...state.top.savedFilters };
        delete filters[filterName];
        const actions: Action[] = [
          topActions.storeFilters({ filters }),
          topActions.saveFiltersToStorage()
        ];

        if (state.preferences.defaultTopFilterName === filterName) {
          const preferences = { ...state.preferences, defaultTopFilterName: null };
          actions.push(
            preferencesActions.storePreferences({ preferences }),
            preferencesActions.savePreferencesToStorage()
          );
        }

        return of(...actions);
      })
    )
  );

  public readonly saveFiltersToStorage$: Observable<any> = createEffect(
    () => this.actions$.pipe(
      ofType(topActions.saveFiltersToStorage),
      withLatestFrom(this.store.select(state => state.top.savedFilters)),
      tap(([action, filters]) => this.topFiltersStorageService.store(filters))
    ),
    { dispatch: false }
  );

  private toTopArticlesRequest(state: RootStateModel): TopArticlesRequestModel {
    const request = new TopArticlesRequestModel();
    request.language = state.preferences.defaultLanguage;
    request.pageSize = 100; // dev plan limitation
    if (state.top.filter) {
      request.searchString = state.top.filter.searchString;
      if (state.top.filter.sources && state.top.filter.sources.length) {
        request.sources = state.top.filter.sources;
      } else {
        request.category = state.top.filter.category;
        request.country = state.top.filter.country;
      }
    }

    return request;
  }
}