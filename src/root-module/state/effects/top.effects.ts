import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { withLatestFrom, tap, concatMap, map, startWith, endWith } from 'rxjs/operators';
import { topActions } from '../actions/top.actions';
import { RootStateModel } from '../models/root-state.model';
import { uiActions } from '../actions/ui.actions';
import { preferencesActions } from '../actions/preferences.actions';
import { ArticlesService } from '../../services/network/articles.service';
import { TopFiltersStorageService } from '../../services/local-storage/top-filters-storage.service';
import { NotificationEnum } from '../../enums/notification.enum';
import { TopArticlesRequestModel } from '../../models/top-articles-request.model';

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
        const storeActionPromise = this.articlesService.fetchTop(request)
          .then(articles => topActions.storeArticles({ articles }));
        return from(storeActionPromise).pipe(
          startWith(uiActions.toggleSpinner({ visible: true })),
          endWith(uiActions.toggleSpinner({ visible: false }))
        );
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
    const filter = state.top.filter
    return new TopArticlesRequestModel({
      language: state.preferences.language,
      searchString: filter && filter.searchString,
      category: filter && filter.category,
      country: filter && filter.country,
      sources: filter && filter.sources
    });
  }
}