import { createAction, props } from '@ngrx/store';
import { TopArticlesRequestModel, ArticleModel } from '@domain';

export const articlesActions = {
  loadTopArticles: createAction(
    'articles-load-top',
    props<{ request: TopArticlesRequestModel}>()
  ),
  storeArticles: createAction(
    'store-articles',
    props<{ articles: ArticleModel[] }>()
  )
};