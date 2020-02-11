import { createAction, props } from '@ngrx/store';
import { LanguageEnum } from '@domain';
import { PreferencesStateModel } from '../models/preferences-state.model';

export const preferencesActions = {
  savePreferencesToStorage: createAction('preferences-save-toStorage', props<{ preferences: PreferencesStateModel }>()),
  readSavedPreferences: createAction('preferences-read-saved'),
  storePreferences: createAction('preferences-store', props<{ preferences: PreferencesStateModel }>()),
  switchLanguage: createAction('preferences-language-store', props<{ language: LanguageEnum }>()),
  toggleInfiniteScroll: createAction('preferences-toggle-infinite-sroll', props<{ enabled: boolean }>())
};