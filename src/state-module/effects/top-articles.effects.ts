import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { ArticlesService } from '@network';
import { topArticlesActions } from '../actions/top-articles.actions';
import { TopArticlesRequestModel } from '@domain';
import { Observable } from 'rxjs';
import { RootStateModel } from '../models/root-state.model';

@Injectable()
export class TopArticlesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService,
    private readonly store: Store<RootStateModel>
  ) {}

  public readonly fetchTopArticles$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.fetchArticles),
      withLatestFrom(this.store),
      mergeMap(([action, state]) => this.mapToStoreTopArticlesAction(state))
    )
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