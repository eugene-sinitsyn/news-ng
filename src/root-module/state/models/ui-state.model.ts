import { NotificationEnum } from '../../enums/notification.enum';

export class UiStateModel {
  public spinner: number = 0;
  public notification: { label: NotificationEnum, duration?: number };
}