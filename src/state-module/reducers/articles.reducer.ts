import { createReducer, Action, on } from '@ngrx/store';
import { ArticleModel } from '@domain';
import { articlesActions } from '../actions/articles.actions';

const reducer = createReducer<ArticleModel[], Action>(
  null,
  on(articlesActions.storeArticles, (state, action) => action.articles)
);

export function articlesReducer(
  state: ArticleModel[],
  action: Action
): ArticleModel[] {
  return reducer(state, action);
}