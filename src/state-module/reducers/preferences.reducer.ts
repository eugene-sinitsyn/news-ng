import { Action, createReducer, on } from '@ngrx/store';
import { PreferencesStateModel } from '../models/preferences-state.model';
import { LanguageEnum } from '@domain';
import { preferencesActions } from '../actions/preferences.actions';

const reducer = createReducer<PreferencesStateModel, Action>(
  {
    language: LanguageEnum.english,
    pageSize: 20
  },
  on(preferencesActions.storeLanguage, (state, action) => {
    return { ...state, language: action.language };
  })
);

export function preferencesReducer(
  state: PreferencesStateModel,
  action: Action
): PreferencesStateModel {
  return reducer(state, action);
}