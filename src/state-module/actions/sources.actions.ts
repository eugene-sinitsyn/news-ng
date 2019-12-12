import { createAction, props } from '@ngrx/store';
import { SourcesRequestModel, SourceDetailsModel } from '@domain';

export const sourcesActions = {
  searchSources: createAction(
    'sources-search',
    props<{ request: SourcesRequestModel }>()
  ),
  storeSources: createAction(
    'sources-store',
    props<{ sources: SourceDetailsModel[] }>()
  )
}