import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RootStateModel } from './models/root-state.model';
import { newsReducer } from './reducers/news.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot<RootStateModel>({ news: newsReducer })
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule {}