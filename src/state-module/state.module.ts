import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NetworkModule } from '@network';
import { RootStateModel } from './models/root-state.model';
import { articlesReducer } from './reducers/articles.reducer';
import { sourcesReducer } from './reducers/sources.reducer';
import { preferencesReducer } from './reducers/preferences.reducer';
import { ArticlesEffects } from './effects/articles.effects';
import { SourcesEffects } from './effects/sources.effects';

@NgModule({
  imports: [
    NetworkModule,
    StoreModule.forRoot<RootStateModel>({
      articles: articlesReducer,
      sources: sourcesReducer,
      preferences: preferencesReducer
    }),
    EffectsModule.forRoot([
      ArticlesEffects,
      SourcesEffects
    ])
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule {}