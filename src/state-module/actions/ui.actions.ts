import { createAction, props } from '@ngrx/store';

export const uiActions = {
  toggleFilter: createAction(
    'ui-toggle-filter',
    props<{ opened: boolean }>()
  )
}