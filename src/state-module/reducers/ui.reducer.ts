import { createReducer, on, Action } from '@ngrx/store';
import { UiStateModel } from '../models/ui-state.model';
import { uiActions } from '../actions/ui.actions';

const reducer = createReducer<UiStateModel, Action>(
  new UiStateModel(),
  on(uiActions.toggleFilter, (state, action) => {
    return { ...state, filterOpened: action.opened };
  }),
  on(uiActions.toggleFilterBadge, (state, action) => {
    return { ...state, filterBadgeVisible: action.visible }
  })
);

export function uiReducer(
  state: UiStateModel,
  action: Action
): UiStateModel {
  return reducer(state, action);
}