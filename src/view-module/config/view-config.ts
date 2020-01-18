import { Injectable } from '@angular/core';

@Injectable()
export class ViewConfiguration {
  public readonly tooltipDelay: number = 500; // ms
  public readonly notificationDuration: number = 3000; // ms
}