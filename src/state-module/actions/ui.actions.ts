import { createAction, props } from '@ngrx/store';

export const uiActions = {
  toggleFilter: createAction(
    'ui-toggle-filter',
    props<{ opened: boolean }>()
  ),
  toggleFilterBadge: createAction(
    'ui-toggle-filter-badge',
    props<{ visible: boolean }>()
  )
}