import { createAction, props } from '@ngrx/store';

import { LanguageEnum } from '../../enums/language.enum';
import { PreferencesStateModel } from '../models/preferences-state.model';

export const preferencesActions = {
  savePreferencesToStorage: createAction('preferences-save-to-storage'),
  storePreferences: createAction('preferences-store', props<{ preferences: PreferencesStateModel }>()),
  storeLanguage: createAction('preferences-language-store', props<{ language: LanguageEnum }>()),
  clearUserData: createAction('preferences-clear-user-data')
};