import { createAction, props } from '@ngrx/store';
import { ArticleModel } from '@domain';

export const readLaterActions = {
  loadReadLaterArticles: createAction('read-later-load'),
  storeReadLaterArticles: createAction('read-later-store', props<{ articles: ArticleModel[] }>()),
  addToReadlater: createAction('read-later-add', props<{ article: ArticleModel }>()),
  removeFromReadLater: createAction('read-later-remove', props<{ url: string }>())
};