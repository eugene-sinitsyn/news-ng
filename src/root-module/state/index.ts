import { PreferencesEffects } from './effects/preferences.effects';
import { ReadLaterEffects } from './effects/read-later.effects';
import { RootEffects } from './effects/root.effects';
import { SourcesEffects } from './effects/sources.effects';
import { TopArticlesEffects } from './effects/top.effects';
import { preferencesReducer } from './reducers/preferences.reducer';
import { readLaterReducer } from './reducers/read-later.reducer';
import { sourcesReducer } from './reducers/sources.reducer';
import { topArticlesReducer } from './reducers/top.reducer';
import { uiReducer } from './reducers/ui.reducer';

export const newsReducers = {
  ui: uiReducer,
  preferences: preferencesReducer,
  top: topArticlesReducer,
  readLater: readLaterReducer,
  sources: sourcesReducer
};

export const newsEffects = [
  PreferencesEffects,
  TopArticlesEffects,
  ReadLaterEffects,
  SourcesEffects,
  RootEffects
];