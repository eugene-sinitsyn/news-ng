import { createAction, props } from '@ngrx/store';
import { TopArticlesRequestModel, ArticleModel } from '@domain';

export const topArticlesActions = {
  fetchArticles: createAction(
    'top-articles-fetch',
    props<{ request: TopArticlesRequestModel }>()
  ),
  storeArticles: createAction(
    'top-articles-store',
    props<{ articles: ArticleModel[] }>()
  )
};