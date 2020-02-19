import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { NotificationEnum } from '@domain';
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
      concatMap(() => {
        const articles = this.readLaterStorageService.getAll();
        return of(readLaterActions.storeReadLaterArticles({ articles }));
      })
    )
  );

  public readonly addToReadLater$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.addToReadlater),
      concatMap(action => {
        this.readLaterStorageService.store(action.article);
        return of(uiActions.notify({ label: NotificationEnum.saved }));
      })
    )
  );

  public readonly removeFromReadLater$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(readLaterActions.removeFromReadLater),
      tap(action => this.readLaterStorageService.delete(action.url))
    ),
    { dispatch: false }
  );
}