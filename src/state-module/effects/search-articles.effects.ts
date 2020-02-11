import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { SearchArticlesRequestModel } from '@domain';
import { ArticlesService } from '@network';
import { searchArticlesActions } from '../actions/search-articles.actions';

@Injectable()
export class SearchArticlesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService
  ) {}

  public readonly searchArticles$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(searchArticlesActions.fetchArticles),
      concatMap(action => this.mapToStoreArticles(action.request))
    )
  );

  private mapToStoreArticles(request: SearchArticlesRequestModel): Promise<Action> {
    return this.articlesService.search(request)
      .then(articles => searchArticlesActions.storeArticles({ articles }));
      // TODO: .catch(error => )
  }
}