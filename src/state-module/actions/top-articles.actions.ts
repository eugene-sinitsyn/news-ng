import { createAction, props } from '@ngrx/store';
import { ArticleModel, TopFiltersDictionary } from '@domain';
import { TopFilterStateModel } from '../models/top-filter-state.model';

export const topArticlesActions = {
  fetchArticles: createAction('top-articles-fetch'),
  storeArticles: createAction(
    'top-articles-store',
    props<{ articles: ArticleModel[] }>()
  ),
  storeFilter: createAction(
    'top-filter-store',
    props<{ filterState: TopFilterStateModel }>()
  ),
  readSavedFiltersFromStorage: createAction('top-filters-read-from-storage'),
  storeSavedFilters: createAction(
    'top-filters-store-saved',
    props<{ filters: TopFiltersDictionary }>()
  ),
  saveFilterToStorage: createAction(
    'top-filter-save-to-storage',
    props<{ filterName: string }>()
  )
};