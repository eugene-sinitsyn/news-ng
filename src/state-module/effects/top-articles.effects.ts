import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { mergeMap, withLatestFrom, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TopArticlesRequestModel } from '@domain';
import { ArticlesService } from '@network';
import { TopFiltersStorageService } from '@storage';
import { topArticlesActions } from '../actions/top-articles.actions';
import { RootStateModel } from '../models/root-state.model';

@Injectable()
export class TopArticlesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootStateModel>,
    private readonly articlesService: ArticlesService,
    private readonly topFiltersStorageService: TopFiltersStorageService,
  ) {}

  public readonly fetchTopArticles$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.fetchArticles),
      withLatestFrom(this.store),
      mergeMap(([action, state]) => this.mapToStoreTopArticlesAction(state))
    )
  );

  public readonly saveFilterToStorage$: Observable<any> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.saveFilterToStorage),
      withLatestFrom(this.store),
      tap(([action, state]) => {
        const filter = this.toTopArticlesRequest(state);
        this.topFiltersStorageService.store(action.filterName, filter);
      })
    ),
    { dispatch: false }
  );

  private mapToStoreTopArticlesAction(state: RootStateModel): Promise<Action> {
    const request = this.toTopArticlesRequest(state);
    return this.articlesService.fetchTop(request)
      .then(articles => topArticlesActions.storeArticles({ articles }));
      // TODO: .catch(error => )
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