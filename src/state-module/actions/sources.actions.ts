import { createAction, props } from '@ngrx/store';
import { SourceDetailsModel, CountryEnum, CategoryEnum } from '@domain';

export const sourcesActions = {
  fetchSources: createAction('sources-fetch', props<{ country?: CountryEnum, category?: CategoryEnum }>()),
  storeSources: createAction('sources-store', props<{ sources: SourceDetailsModel[] }>())
}