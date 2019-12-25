import { createReducer, Action, on } from '@ngrx/store';
import { topArticlesActions } from '../actions/top-articles.actions';
import { TopArticlesStateModel } from '../models/top-articles-state.model';
import { TopFilterStateModel } from '../models/top-filter-state.model';

const reducer = createReducer<TopArticlesStateModel, Action>(
  {
    filter: new TopFilterStateModel(),
    articles: null
  },
  on(topArticlesActions.storeArticles, (state, action) => {
    return { ...state, articles: action.articles };
  }),
  on(topArticlesActions.storeFilter, (state, action) => {
    return { ...state, filter: action.filterState };
  })
);

export function topArticlesReducer(
  state: TopArticlesStateModel,
  action: Action
): TopArticlesStateModel {
  return reducer(state, action);
}