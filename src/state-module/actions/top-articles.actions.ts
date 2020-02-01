import { createAction, props } from '@ngrx/store';
import { ArticleModel, TopFiltersDictionary } from '@domain';
import { TopFilterStateModel } from '../models/top-filter-state.model';

export const topArticlesActions = {
  fetchArticles: createAction('top--fetch-articles'),
  storeArticles: createAction('top--store-articles', props<{ articles: ArticleModel[] }>()),
  showMoreArticles: createAction('top--show-more-articles'),
  storeFilter: createAction('top--store-filter', props<{ filterState: TopFilterStateModel }>()),
  readSavedFilters: createAction('top--read-saved-filters'),
  storeSavedFilters: createAction('top--store-saved-filters', props<{ filters: TopFiltersDictionary }>()),
  deleteSavedFilter: createAction('top--delete-saved-filter', props<{ filterName: string }>()),
  saveFilterToStorage: createAction('top--save-filter-to-storage', props<{ filterName: string }>())
};