import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NetworkModule } from '@network';
import { StorageModule } from '@storage';
import { RootStateModel } from './models/root-state.model';
import { uiReducer } from './reducers/ui.reducer';
import { preferencesReducer } from './reducers/preferences.reducer';
import { topArticlesReducer } from './reducers/top-articles.reducer';
import { searchArticlesReducer } from './reducers/search-articles.reducer';
import { sourcesReducer } from './reducers/sources.reducer';
import { SourcesEffects } from './effects/sources.effects';
import { TopArticlesEffects } from './effects/top-articles.effects';
import { SearchArticlesEffects } from './effects/search-articles.effects';
import { PreferencesEffects } from './effects/preferences.effects';

@NgModule({
  imports: [
    NetworkModule,
    StorageModule,
    StoreModule.forRoot<RootStateModel>({
      ui: uiReducer,
      preferences: preferencesReducer,
      top: topArticlesReducer,
      search: searchArticlesReducer,
      sources: sourcesReducer
    }),
    EffectsModule.forRoot([
      TopArticlesEffects,
      SearchArticlesEffects,
      SourcesEffects,
      PreferencesEffects
    ])
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule {}