import { createReducer, Action, on } from '@ngrx/store';
import { topArticlesActions } from '../actions/top-articles.actions';
import { TopArticlesStateModel } from '../models/top-articles-state.model';
import { ArticleModel } from '@domain';

const reducer = createReducer<TopArticlesStateModel, Action>(
  {
    filter: null,
    articles: null
  },
  on(topArticlesActions.storeArticles, (state, action) => {
    return { ...state, articles: distinctByUrl(action.articles) };
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

function distinctByUrl(articles: ArticleModel[]): ArticleModel[] {
  const dictionary = {};
  for (const article of articles) dictionary[article.url] = article;
  return Object.keys(dictionary).map(key => dictionary[key]);
}