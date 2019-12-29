import { createAction, props } from '@ngrx/store';

export const uiActions = {
  toggleSpinner: createAction(
    'ui-toggle-spinner',
    props<{ visible: boolean }>()
  ),
  toggleFilter: createAction(
    'ui-toggle-filter',
    props<{ opened: boolean }>()
  )
}