import { createReducer, on, Action } from "@ngrx/store";
import { readLaterActions } from '../actions/read-later.actions';
import { ReadLaterStateModel } from '../models/read-later-state.model';

const reducer = createReducer<ReadLaterStateModel, Action>(
  { articles: null, page: 1 },
  on(readLaterActions.storeArticles, (state, action) => {
    return { ...state, articles: action.articles };
  }),
  on(readLaterActions.showMoreArticles, (state, action) => {
    return { ...state, page: state.page + 1 };
  })
);

export function readLaterReducer(
  state: ReadLaterStateModel,
  action: Action
): ReadLaterStateModel {
  return reducer(state, action);
}