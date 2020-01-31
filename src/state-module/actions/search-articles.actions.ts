import { createAction, props } from '@ngrx/store';
import { SearchArticlesRequestModel, ArticleModel, Page } from '@domain';

export const searchArticlesActions = {
  fetchArticles: createAction(
    'search-articles-fetch',
    props<{ request: SearchArticlesRequestModel }>()
  ),
  storeArticles: createAction(
    'search-articles-store',
    props<{ articles: Page<ArticleModel> }>()
  )
}