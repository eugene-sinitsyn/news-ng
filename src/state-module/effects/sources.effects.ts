import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SourcesService } from '@network';
import { sourcesActions } from '../actions/sources.actions';
import { SourcesRequestModel } from '@domain';

export class SourcesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly sourcesService: SourcesService
  ) {}

  public readonly searchSources$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(sourcesActions.searchSources),
      mergeMap(action => this.mapToStoreSources(action.request))
    )
  );

  private mapToStoreSources(request: SourcesRequestModel): Promise<Action> {
    return this.sourcesService.search(request)
      .then(sources => sourcesActions.storeSources({ sources }))
      // TODO: .catch(error => )
  }
}