import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, defer } from 'rxjs';
import { withLatestFrom, tap, concatMap } from 'rxjs/operators';
import { TopArticlesRequestModel, NotificationEnum } from '@domain';
import { ArticlesService } from '@network';
import { TopFiltersStorageService } from '@storage';
import { topActions } from '../actions/top.actions';
import { RootStateModel } from '../models/root-state.model';
import { uiActions } from '../actions/ui.actions';

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

  public readonly readFiltersFromStorage$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topActions.readFiltersFromStorage),
      concatMap(() => {
        const filters = this.topFiltersStorageService.get();
        return of(topActions.storeFilters({ filters }));
      })
    )
  );

  public readonly saveFilter$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topActions.saveFilter),
      withLatestFrom(this.store),
      concatMap(([action, state]) => {
        const filter = this.toTopArticlesRequest(state);
        const filters = { ...state.top.savedFilters };
        filters[action.filterName] = filter;
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
      withLatestFrom(this.store.select(state => state.top.savedFilters)),
      concatMap(([action, savedFilters]) => {
        const filters = { ...savedFilters };
        delete filters[action.filterName];
        return of(
          topActions.storeFilters({ filters }),
          topActions.saveFiltersToStorage()
        );
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

  public readonly readFiltersFromStorageImmediately$: Observable<Action> = createEffect(
    () => defer(() => of(topActions.readFiltersFromStorage()))
  );

  private toTopArticlesRequest(state: RootStateModel): TopArticlesRequestModel {
    const request = new TopArticlesRequestModel();
    request.language = state.preferences.language;
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