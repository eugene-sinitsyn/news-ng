import { createReducer, on, Action } from '@ngrx/store';
import { UiStateModel } from '../models/ui-state.model';
import { uiActions } from '../actions/ui.actions';

const reducer = createReducer<UiStateModel, Action>(
  new UiStateModel(),
  on(uiActions.toggleSpinner, (state, action) => {
    let spinner = state.spinner;
    spinner = action.visible ? spinner + 1 : spinner - 1;
    if (spinner < 0) spinner = 0;
    return { ...state, spinner };
  }),
  on(uiActions.notify, (state, action) => {
    const notification = !action.label ? null : {
      label: action.label,
      duration: action.duration
    };
    return { ...state, notification };
  })
);

export function uiReducer(
  state: UiStateModel,
  action: Action
): UiStateModel {
  return reducer(state, action);
}