import { NotificationEnum } from '@domain';

export class UiStateModel {
  public spinner: number = 0;
  public notification: { label: NotificationEnum, duration?: number };
}