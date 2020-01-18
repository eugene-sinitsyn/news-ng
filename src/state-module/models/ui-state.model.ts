import { NotificationEnum } from '@domain';

export class UiStateModel {
  public spinner: number = 0;
  public filterOpened: boolean = false;
  public notification: { label: NotificationEnum, duration?: number };
}