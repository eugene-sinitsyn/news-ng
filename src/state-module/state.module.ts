import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NetworkModule } from '@network';
import { RootStateModel } from './models/root-state.model';
import { articlesReducer } from './reducers/articles.reducer';
import { ArticlesEffects } from './effects/articles.effects';

@NgModule({
  imports: [
    NetworkModule,
    StoreModule.forRoot<RootStateModel>({ articles: articlesReducer }),
    EffectsModule.forRoot([ArticlesEffects])
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule {}