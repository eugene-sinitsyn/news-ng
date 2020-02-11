import { Action, createReducer, on } from '@ngrx/store';
import { PreferencesStateModel } from '../models/preferences-state.model';
import { LanguageEnum, PageSizeEnum } from '@domain';
import { preferencesActions } from '../actions/preferences.actions';

const reducer = createReducer<PreferencesStateModel, Action>(
  {
    language: LanguageEnum.english,
    pageSize: PageSizeEnum.small,
    infiniteScroll: true
  },
  on(preferencesActions.storePreferences, (state, action) => {
    return { ...state, ...action.preferences };
  }),
  on(preferencesActions.switchLanguage, (state, action) => {
    return { ...state, language: action.language };
  }),
  on(preferencesActions.toggleInfiniteScroll, (state, action) => {
    return { ...state, infiniteScroll: action.enabled };
  })
);

export function preferencesReducer(
  state: PreferencesStateModel,
  action: Action
): PreferencesStateModel {
  return reducer(state, action);
}