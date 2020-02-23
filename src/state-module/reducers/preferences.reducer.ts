import { Action, createReducer, on } from '@ngrx/store';
import { PreferencesStateModel } from '../models/preferences-state.model';
import { LanguageEnum, PageSizeEnum } from '@domain';
import { preferencesActions } from '../actions/preferences.actions';

export const defaultPreferences: PreferencesStateModel = {
  language: LanguageEnum.english,
  defaultTopFilterName: null,
  pageSize: PageSizeEnum.small,
  infiniteScroll: true,
  darkTheme: true
};

const reducer = createReducer<PreferencesStateModel, Action>(
  defaultPreferences,
  on(preferencesActions.storePreferences, (state, action) => {
    return { ...state, ...action.preferences };
  }),
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