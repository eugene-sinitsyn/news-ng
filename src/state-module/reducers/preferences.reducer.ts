import { Action, createReducer, on } from '@ngrx/store';
import { LanguageEnum, PreferencesModel } from '@domain';
import { preferencesActions } from '../actions/preferences.actions';

const reducer = createReducer<PreferencesModel, Action>(
  { language: LanguageEnum.english },
  on(preferencesActions.storeLanguage, (state, action) => {
    return { ...state, language: action.language };
  })
);

export function preferencesReducer(
  state: PreferencesModel,
  action: Action
): PreferencesModel {
  return reducer(state, action);
}