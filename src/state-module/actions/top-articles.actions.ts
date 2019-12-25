import { createAction, props } from '@ngrx/store';
import { TopArticlesRequestModel, ArticleModel } from '@domain';
import { TopFilterStateModel } from '../models/top-filter-state.model';

export const topArticlesActions = {
  fetchArticles: createAction(
    'top-articles-fetch',
    props<{ request: TopArticlesRequestModel }>()
  ),
  storeArticles: createAction(
    'top-articles-store',
    props<{ articles: ArticleModel[] }>()
  ),
  storeFilter: createAction(
    'top-filter-store',
    props<{ filterState: TopFilterStateModel }>()
  )
};