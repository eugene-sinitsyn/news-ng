import { Action, createReducer, on } from '@ngrx/store';

import { SourceDetailsModel } from '../../models/source-details.model';
import { sourcesActions } from '../actions/sources.actions';

const reducer = createReducer<SourceDetailsModel[], Action>(
  [],
  on(sourcesActions.storeSources, (state, action) => [...action.sources])
);

export function sourcesReducer(
  state: SourceDetailsModel[],
  action: Action
): SourceDetailsModel[] {
  return reducer(state, action);
}