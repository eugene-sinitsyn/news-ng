import { createReducer, on, Action } from "@ngrx/store";
import { SearchArticlesRequestModel } from '@domain';
import { searchArticlesActions } from '../actions/search-articles.actions';
import { SearchArticlesStateModel } from '../models/search-articles-state.model';

const reducer = createReducer<SearchArticlesStateModel, Action>(
  {
    filter: new SearchArticlesRequestModel,
    articles: null,
  },
  on(searchArticlesActions.storeArticles, (state, action) => {
    return { ...state, articles: action.articles };
  })
);

export function searchArticlesReducer(
  state: SearchArticlesStateModel,
  action: Action
): SearchArticlesStateModel {
  return reducer(state, action);
}