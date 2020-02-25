import { createAction, props } from '@ngrx/store';
import { SourceDetailsModel } from '../../models/source-details.model';

export const sourcesActions = {
  fetchSources: createAction('sources-fetch'),
  storeSources: createAction('sources-store', props<{ sources: SourceDetailsModel[] }>())
}