import { createReducer, on, Action } from '@ngrx/store';
import { UiStateModel } from '../models/ui-state.model';
import { uiActions } from '../actions/ui.actions';

const reducer = createReducer<UiStateModel, Action>(
  { filterOpened: false },
  on(uiActions.toggleFilter, (state, action) => {
    return { ...state, filterOpened: action.opened };
  })
);

export function uiReducer(
  state: UiStateModel,
  action: Action
): UiStateModel {
  return reducer(state, action);
}