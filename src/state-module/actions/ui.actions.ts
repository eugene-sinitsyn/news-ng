import { createAction, props } from '@ngrx/store';
import { NotificationEnum } from '@domain';

export const uiActions = {
  toggleSpinner: createAction('ui-toggle-spinner', props<{ visible: boolean }>()),
  notify: createAction('ui-notify', props<{ label: NotificationEnum, duration?: number }>())
}