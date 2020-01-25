import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { mergeMap, withLatestFrom, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TopArticlesRequestModel, NotificationEnum } from '@domain';
import { ArticlesService } from '@network';
import { TopFiltersStorageService } from '@storage';
import { topArticlesActions } from '../actions/top-articles.actions';
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
      ofType(topArticlesActions.fetchArticles),
      withLatestFrom(this.store),
      mergeMap(([action, state]) => this.mapToStoreTopArticlesAction(state))
    )
  );

  public readonly readSavedFilters$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.readSavedFilters),
      mergeMap(() => this.maptoStoreSavedFiltersAction())
    )
  );

  public readonly deleteSavedFilter$: Observable<any> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.deleteSavedFilter),
      tap(action => this.topFiltersStorageService.delete(action.filterName))
    ),
    { dispatch: false }
  );

  public readonly saveFilterToStorage$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.saveFilterToStorage),
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        return this.mapToFilterSavedNotifyAction(state, action.filterName);
      })
    ),
  );

  private mapToStoreTopArticlesAction(state: RootStateModel): Promise<Action> {
    const request = this.toTopArticlesRequest(state);
    return this.articlesService.fetchTop(request)
      .then(articles => topArticlesActions.storeArticles({ articles }));
      // TODO: .catch(error => )
  }

  private maptoStoreSavedFiltersAction(): Observable<Action> {
    const filters = this.topFiltersStorageService.getAll();
    return of(topArticlesActions.storeSavedFilters({ filters }));
  }

  private mapToFilterSavedNotifyAction(
    state: RootStateModel,
    filterName: string
  ): Observable<Action> {
    const filter = this.toTopArticlesRequest(state);
    this.topFiltersStorageService.store(filterName, filter);
    return of(uiActions.notify({ label: NotificationEnum.saved }));
  }

  private toTopArticlesRequest(state: RootStateModel): TopArticlesRequestModel {
    const request = new TopArticlesRequestModel();
    request.language = state.preferences.language;
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