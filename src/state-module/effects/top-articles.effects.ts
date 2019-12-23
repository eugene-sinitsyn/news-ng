import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { ArticlesService } from '@network';
import { topArticlesActions } from '../actions/top-articles.actions';
import { TopArticlesRequestModel, SearchArticlesRequestModel } from '@domain';
import { Observable } from 'rxjs';

@Injectable()
export class TopArticlesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService
  ) {}

  public readonly fetchTopArticles$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(topArticlesActions.fetchArticles),
      mergeMap(action => this.mapToStoreTopArticles(action.request))
    )
  );

  private mapToStoreTopArticles(request: TopArticlesRequestModel): Promise<Action> {
    return this.articlesService.searchTop(request)
      .then(articles => topArticlesActions.storeArticles({ articles }));
      // TODO: .catch(error => )
  }
}