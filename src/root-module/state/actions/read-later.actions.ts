import { createAction, props } from '@ngrx/store';

import { ArticleModel } from '../../models/article.model';

export const readLaterActions = {
  storeArticles: createAction('store-read-later-articles', props<{ articles: ArticleModel[] }>()),
  showMoreArticles: createAction('show-more-read-later-articles'),
  saveToReadlater: createAction('save-to-read-later', props<{ article: ArticleModel }>()),
  deleteFromReadLater: createAction('delete-from-read-later', props<{ url: string }>()),
  saveArticlesToStorage: createAction('save-articles-to-storage')
};