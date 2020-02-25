import { on, createReducer, Action } from '@ngrx/store';
import { sourcesActions } from '../actions/sources.actions';
import { SourceDetailsModel } from '../../models/source-details.model';

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