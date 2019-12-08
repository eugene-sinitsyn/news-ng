import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { ArticlesService } from '@network';
import { articlesActions } from '../actions/articles.actions';
import { TopArticlesRequestModel } from '@domain';

@Injectable()
export class ArticlesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService
  ) {}

  public readonly loadTopArticles$ = createEffect(
    () => this.actions$.pipe(
      ofType(articlesActions.loadTopArticles),
      mergeMap(action => this.mapToStoreTopArticles(action.request))
    )
  );

  private mapToStoreTopArticles(request: TopArticlesRequestModel): Promise<Action> {
    return this.articlesService.getTop(request)
      .then(articles => articlesActions.storeArticles({ articles: articles }));
      // TODO: .catch(error => )
  }
}