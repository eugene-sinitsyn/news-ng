import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ArticleModel, NotificationEnum } from '@domain';
import { ArticlesStorageService } from '@storage';
import { readLaterActions } from '../actions/read-later.actions';
import { uiActions } from '../actions/ui.actions';

@Injectable()
export class ReadLaterEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly readLaterStorageService: ArticlesStorageService
  ) {}

  public readonly loadReadLaterArticles$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.loadReadLaterArticles),
      mergeMap(() => this.mapToStoreReadLaterArticlesAction())
    )
  );

  public readonly addToReadLater$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.addToReadlater),
      mergeMap(action => this.mapToArticleSavedNotifyAction(action.article))
    )
  );

  public readonly removeFromReadLater$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.removeFromReadLater),
      mergeMap(action => this.mapToArticleRemovedNotifyAction(action.url))
    )
  )

  private mapToStoreReadLaterArticlesAction(): Observable<Action> {
    const articles = this.readLaterStorageService.getAll();
    return of(readLaterActions.storeReadLaterArticles({ articles }));
  }

  private mapToArticleSavedNotifyAction(
    article: ArticleModel
  ): Observable<Action> {
    this.readLaterStorageService.store(article);
    return of(uiActions.notify({ label: NotificationEnum.saved }));
  }

  private mapToArticleRemovedNotifyAction(url: string): Observable<Action> {
    this.readLaterStorageService.delete(url);
    return of(uiActions.notify({ label: NotificationEnum.removed }));
  }
}