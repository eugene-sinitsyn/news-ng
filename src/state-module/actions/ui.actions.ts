import { createAction, props } from '@ngrx/store';
import { NotificationEnum } from '@domain';

export const uiActions = {
  toggleSpinner: createAction(
    'ui-toggle-spinner',
    props<{ visible: boolean }>()
  ),
  toggleFilter: createAction(
    'ui-toggle-filter',
    props<{ opened: boolean }>()
  ),
  notify: createAction(
    'ui-notify',
    props<{ label: NotificationEnum, duration?: number }>()
  )
}