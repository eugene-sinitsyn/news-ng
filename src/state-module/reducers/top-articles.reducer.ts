import { createReducer, Action, on } from '@ngrx/store';
import { topArticlesActions } from '../actions/top-articles.actions';
import { TopArticlesStateModel } from '../models/top-articles-state.model';
import { ArticleModel } from '@domain';

const reducer = createReducer<TopArticlesStateModel, Action>(
  {
    filter: null,
    savedFilters: {},
    articles: null,
    total: 0
  },
  on(topArticlesActions.storeArticles, (state, action) => {
    return {
      ...state,
      articles: action.page.array,
      total: action.page.total
    };
  }),
  on(topArticlesActions.storeMoreArticles, (state, action) => {
    return {
      ...state,
      articles: [...state.articles, ...action.page.array],
      total: action.page.total
    };
  }),
  on(topArticlesActions.storeFilter, (state, action) => {
    return { ...state, filter: action.filterState };
  }),
  on(topArticlesActions.storeSavedFilters, (state, action) => {
    return { ...state, savedFilters: action.filters };
  })
);

export function topArticlesReducer(
  state: TopArticlesStateModel,
  action: Action
): TopArticlesStateModel {
  return reducer(state, action);
}