import { createAction, props } from '@ngrx/store';
import {
  TopArticlesRequestModel,
  ArticleModel,
  SearchArticlesRequestModel
} from '@domain';

export const articlesActions = {
  loadTopArticles: createAction(
    'articles-load-top',
    props<{ request: TopArticlesRequestModel }>()
  ),
  searchArticles: createAction(
    'articles-search',
    props<{ request: SearchArticlesRequestModel }>()
  ),
  storeArticles: createAction(
    'store-articles',
    props<{ articles: ArticleModel[] }>()
  )
};