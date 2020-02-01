import { createAction, props } from '@ngrx/store';
import { SearchArticlesRequestModel, ArticleModel } from '@domain';

export const searchArticlesActions = {
  fetchArticles: createAction('search--fetch-articles', props<{ request: SearchArticlesRequestModel }>()),
  storeArticles: createAction('search--store-articles', props<{ articles: ArticleModel[] }>())
}