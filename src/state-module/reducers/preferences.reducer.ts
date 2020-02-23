import { Action, createReducer, on } from '@ngrx/store';
import { PreferencesStateModel } from '../models/preferences-state.model';
import { LanguageEnum, PageSizeEnum } from '@domain';
import { preferencesActions } from '../actions/preferences.actions';

export const defaultPreferences: PreferencesStateModel = {
  defaultLanguage: LanguageEnum.english,
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
  on(preferencesActions.switchLanguage, (state, action) => {
    return { ...state, defaultLanguage: action.language };
  })
);

export function preferencesReducer(
  state: PreferencesStateModel,
  action: Action
): PreferencesStateModel {
  return reducer(state, action);
}