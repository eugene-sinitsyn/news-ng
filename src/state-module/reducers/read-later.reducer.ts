import { createReducer, on, Action } from "@ngrx/store";
import { ArticleModel } from '@domain';
import { readLaterActions } from '../actions/read-later.actions';

const reducer = createReducer<ArticleModel[], Action>(
  [],
  on(readLaterActions.storeArticles, (state, action) => {
    return action.articles;
  })
);

export function readLaterReducer(
  state: ArticleModel[],
  action: Action
): ArticleModel[] {
  return reducer(state, action);
}