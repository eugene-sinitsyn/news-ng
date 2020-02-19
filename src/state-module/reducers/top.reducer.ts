import { createReducer, Action, on } from '@ngrx/store';
import { topActions } from '../actions/top.actions';
import { TopArticlesStateModel } from '../models/top-state.model';
import { ArticleModel } from '@domain';

const reducer = createReducer<TopArticlesStateModel, Action>(
  {
    filter: null,
    savedFilters: {},
    articles: null,
    page: 1,
  },
  on(topActions.storeArticles, (state, action) => {
    return { ...state, articles: distinctByUrl(action.articles) };
  }),
  on(topActions.showMoreArticles, (state, action) => {
    return { ...state, page: state.page + 1 };
  }),
  on(topActions.storeFilter, (state, action) => {
    return { ...state, filter: action.filterState };
  }),
  on(topActions.storeFilters, (state, action) => {
    return { ...state, savedFilters: action.filters };
  })
);

export function topArticlesReducer(
  state: TopArticlesStateModel,
  action: Action
): TopArticlesStateModel {
  return reducer(state, action);
}

function distinctByUrl(articles: ArticleModel[]): ArticleModel[] {
  const dictionary = {};
  for (const article of articles) dictionary[article.url] = article;
  return Object.keys(dictionary).map(key => dictionary[key]);
}