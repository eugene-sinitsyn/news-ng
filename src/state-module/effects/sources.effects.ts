import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, defer, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { SourcesService } from '@network';
import { sourcesActions } from '../actions/sources.actions';

@Injectable()
export class SourcesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly sourcesService: SourcesService
  ) {}

  public readonly fetchSources$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(sourcesActions.fetchSources),
      concatMap(() => {
        return this.sourcesService.search()
          .then(sources => sourcesActions.storeSources({ sources }))
        // TODO: .catch(error => )
      })
    )
  );

  public readonly fetchSourcesImmediatly$: Observable<Action> = createEffect(
    () => defer(() => of(sourcesActions.fetchSources()))
  );
}