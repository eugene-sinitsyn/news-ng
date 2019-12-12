import { SourceDetailsModel } from '@domain';
import { on, createReducer, Action } from '@ngrx/store';
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