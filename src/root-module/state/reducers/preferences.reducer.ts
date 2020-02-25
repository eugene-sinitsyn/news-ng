import { Action, createReducer, on } from '@ngrx/store';

import { LanguageEnum } from '../../enums/language.enum';
import { PageSizeEnum } from '../../enums/page-size.enum';
import { preferencesActions } from '../actions/preferences.actions';
import { PreferencesStateModel } from '../models/preferences-state.model';

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