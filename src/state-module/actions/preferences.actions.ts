import { createAction, props } from '@ngrx/store';
import { LanguageEnum } from '@domain';
import { PreferencesStateModel } from '../models/preferences-state.model';

export const preferencesActions = {
  savePreferencesToStorage: createAction('preferences-save-to-storage'),
  storePreferences: createAction('preferences-store', props<{ preferences: PreferencesStateModel }>()),
  switchLanguage: createAction('preferences-language-store', props<{ language: LanguageEnum }>()),
  clearUserData: createAction('preferences-clear-user-data')
};