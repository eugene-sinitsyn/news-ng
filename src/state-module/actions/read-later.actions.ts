import { createAction, props } from '@ngrx/store';
import { ArticleModel } from '@domain';

export const readLaterActions = {
  storeArticles: createAction('store-read-later-articles', props<{ articles: ArticleModel[] }>()),
  saveToReadlater: createAction('save-to-read-later', props<{ article: ArticleModel }>()),
  deleteFromReadLater: createAction('delete-from-read-later', props<{ url: string }>()),
  saveArticlesToStorage: createAction('save-articles-to-storage')
};