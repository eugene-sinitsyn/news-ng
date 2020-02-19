import { createAction, props } from '@ngrx/store';
import { ArticleModel, TopFiltersDictionary } from '@domain';
import { TopFilterStateModel } from '../models/top-filter-state.model';

export const topActions = {
  fetchArticles: createAction('fetch-top-articles'),
  storeArticles: createAction('store-top-articles', props<{ articles: ArticleModel[] }>()),
  showMoreArticles: createAction('show-more-top-articles'),

  storeFilter: createAction('store-top-filter', props<{ filterState: TopFilterStateModel }>()),
  saveFilter: createAction('save-top-filter', props<{ filterName: string }>()),
  deleteFilter: createAction('delete-top-filter', props<{ filterName: string }>()),

  readFiltersFromStorage: createAction('read-top-filters-from-storage'),
  storeFilters: createAction('store-top-filters', props<{ filters: TopFiltersDictionary }>()),
  saveFiltersToStorage: createAction('save-top-filters-to-storage')
};