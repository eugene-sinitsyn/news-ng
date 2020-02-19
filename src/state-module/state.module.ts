import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NetworkModule } from '@network';
import { StorageModule } from '@storage';
import { RootStateModel } from './models/root-state.model';
import { uiReducer } from './reducers/ui.reducer';
import { preferencesReducer } from './reducers/preferences.reducer';
import { topArticlesReducer } from './reducers/top.reducer';
import { sourcesReducer } from './reducers/sources.reducer';
import { readLaterReducer } from './reducers/read-later.reducer';
import { SourcesEffects } from './effects/sources.effects';
import { TopArticlesEffects } from './effects/top.effects';
import { ReadLaterEffects } from './effects/read-later.effects';
import { PreferencesEffects } from './effects/preferences.effects';
import { RootEffects } from './effects/root.effects';

@NgModule({
  imports: [
    NetworkModule,
    StorageModule,
    StoreModule.forRoot<RootStateModel>({
      ui: uiReducer,
      preferences: preferencesReducer,
      top: topArticlesReducer,
      readLater: readLaterReducer,
      sources: sourcesReducer
    }),
    EffectsModule.forRoot([
      PreferencesEffects,
      TopArticlesEffects,
      ReadLaterEffects,
      SourcesEffects,
      RootEffects
    ])
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule {}