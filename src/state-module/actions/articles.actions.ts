import { createAction, props } from '@ngrx/store';
import {
  TopArticlesRequestModel,
  ArticleModel,
  SearchArticlesRequestModel
} from '@domain';

export const articlesActions = {
  searchTopArticles: createAction(
    'articles-search-top',
    props<{ request: TopArticlesRequestModel }>()
  ),
  searchArticles: createAction(
    'articles-search',
    props<{ request: SearchArticlesRequestModel }>()
  ),
  storeArticles: createAction(
    'articles-store',
    props<{ articles: ArticleModel[] }>()
  )
};