import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, concatMap, withLatestFrom, map } from 'rxjs/operators';
import { NotificationEnum, ArticleModel } from '@domain';
import { ReadLaterStorageService } from '@storage';
import { readLaterActions } from '../actions/read-later.actions';
import { uiActions } from '../actions/ui.actions';
import { RootStateModel } from '../models/root-state.model';

@Injectable()
export class ReadLaterEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootStateModel>,
    private readonly readLaterStorageService: ReadLaterStorageService
  ) {}

  public readonly saveToReadlater$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.saveToReadlater),
      map(action => action.article),
      withLatestFrom(this.store.select(state => state.readLater)),
      concatMap(([article, previousArticles]) => {
        const articles = this.pushArticle(article, previousArticles);
        return of(
          readLaterActions.storeArticles({ articles }),
          readLaterActions.saveArticlesToStorage(),
          uiActions.notify({ label: NotificationEnum.saved })
        );
      })
    )
  );

  public readonly deleteFromReadLater$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.deleteFromReadLater),
      map(action => action.url),
      withLatestFrom(this.store.select(state => state.readLater)),
      concatMap(([url, previousArticles]) => {
        const articles = (previousArticles || [])
          .filter(article => article.url !== url);
        return of(
          readLaterActions.storeArticles({ articles }),
          readLaterActions.saveArticlesToStorage()
        );
      })
    )
  );

  public readonly saveArticlesToStorage$: Observable<any> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.saveArticlesToStorage),
      withLatestFrom(this.store.select(state => state.readLater)),
      tap(([action, articles]) => this.readLaterStorageService.store(articles))
    ),
    { dispatch: false }
  );

  private pushArticle(
    article: ArticleModel,
    previousArticles: ArticleModel[]
  ): ArticleModel[] {
    const index = previousArticles.findIndex(a => a.url === article.url);
    const articles = [...previousArticles];
    if (index >= 0) articles[index] = article;
    else articles.push(article);
    return articles;
  }
}