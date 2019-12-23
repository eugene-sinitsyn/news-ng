import { createReducer, Action, on } from '@ngrx/store';
import { TopArticlesRequestModel } from '@domain';
import { topArticlesActions } from '../actions/top-articles.actions';
import { TopArticlesStateModel } from '../models/top-articles-state.model';

const reducer = createReducer<TopArticlesStateModel, Action>(
  { filter: new TopArticlesRequestModel, articles: null },
  on(topArticlesActions.storeArticles, (state, action) => {
    return { ...state, articles: action.articles };
  })
);

export function topArticlesReducer(
  state: TopArticlesStateModel,
  action: Action
): TopArticlesStateModel {
  return reducer(state, action);
}