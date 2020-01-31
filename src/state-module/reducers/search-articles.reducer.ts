import { createReducer, on, Action } from "@ngrx/store";
import { SearchArticlesRequestModel } from '@domain';
import { searchArticlesActions } from '../actions/search-articles.actions';
import { SearchArticlesStateModel } from '../models/search-articles-state.model';

const reducer = createReducer<SearchArticlesStateModel, Action>(
  {
    filter: new SearchArticlesRequestModel,
    articles: null,
    total: 0
  },
  on(searchArticlesActions.storeArticles, (state, action) => {
    return {
      ...state,
      articles: action.articles.toArray(),
      total: action.articles.total
    };
  })
);

export function searchArticlesReducer(
  state: SearchArticlesStateModel,
  action: Action
): SearchArticlesStateModel {
  return reducer(state, action);
}