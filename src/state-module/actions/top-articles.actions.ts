import { createAction, props } from '@ngrx/store';
import { ArticleModel, TopFiltersDictionary, Page } from '@domain';
import { TopFilterStateModel } from '../models/top-filter-state.model';

export const topArticlesActions = {
  fetchArticles: createAction('top-articles-fetch'),
  storeArticles: createAction(
    'top-articles-store',
    props<{ articles: Page<ArticleModel> }>()
  ),
  storeFilter: createAction(
    'top-filter-store',
    props<{ filterState: TopFilterStateModel }>()
  ),
  readSavedFilters: createAction('top-filters-read-saved'),
  storeSavedFilters: createAction(
    'top-filters-store-saved',
    props<{ filters: TopFiltersDictionary }>()
  ),
  deleteSavedFilter: createAction(
    'top-filter-delete-saved',
    props<{ filterName: string }>()
  ),
  saveFilterToStorage: createAction(
    'top-filter-save-to-storage',
    props<{ filterName: string }>()
  )
};