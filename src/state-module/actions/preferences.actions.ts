import { createAction, props } from '@ngrx/store';
import { LanguageEnum } from '@domain';

export const preferencesActions = {
  storeLanguage: createAction(
    'preferences-language-store',
    props<{ language: LanguageEnum }>()
  )
};