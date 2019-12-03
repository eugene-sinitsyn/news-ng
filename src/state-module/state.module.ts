import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NetworkModule } from '@network';
import { RootStateModel } from './models/root-state.model';
import { newsReducer } from './reducers/news.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot<RootStateModel>({ news: newsReducer }),
    NetworkModule
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule {}