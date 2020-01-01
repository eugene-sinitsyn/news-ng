import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, withLatestFrom, map } from 'rxjs/operators';
import { SourcesRequestModel, CountryEnum, CategoryEnum, LanguageEnum } from '@domain';
import { SourcesService } from '@network';
import { sourcesActions } from '../actions/sources.actions';
import { RootStateModel } from '../models/root-state.model';

export class SourcesEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly sourcesService: SourcesService,
    private readonly store: Store<RootStateModel>
  ) {}

  public readonly searchSources$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(sourcesActions.fetchSources),
      withLatestFrom(this.store.select(state => state.preferences.language)),
      map(([action, language]) => {
        return this.toSourcesRequest(language, action.country, action.category);
      }),
      mergeMap(request => this.mapToStoreSources(request))
    )
  );

  private mapToStoreSources(request: SourcesRequestModel): Promise<Action> {
    return this.sourcesService.search(request)
      .then(sources => sourcesActions.storeSources({ sources }))
      // TODO: .catch(error => )
  }

  private toSourcesRequest(
    language: LanguageEnum,
    country: CountryEnum,
    category: CategoryEnum
  ): SourcesRequestModel {
    const request = new SourcesRequestModel();
    request.language = language;
    request.country = country;
    request.category = category;
    return request;
  }
}