import { createAction } from '@ngrx/store';

export const rootActions = {
  readStateFromStorage: createAction('read-state-from-storage')
}