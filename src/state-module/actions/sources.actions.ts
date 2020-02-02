import { createAction, props } from '@ngrx/store';
import { SourceDetailsModel } from '@domain';

export const sourcesActions = {
  fetchSources: createAction('sources-fetch'),
  storeSources: createAction('sources-store', props<{ sources: SourceDetailsModel[] }>())
}