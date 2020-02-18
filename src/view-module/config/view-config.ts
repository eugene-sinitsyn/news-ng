import { Injectable } from '@angular/core';

@Injectable()
export class ViewConfiguration {
  public readonly tooltipDelay: number = 500; // ms
  public readonly notificationDuration: number = 3000; // ms
  public readonly darkThemeStylesUrl: string = 'assets/themes/pink-bluegrey.css';
  public readonly lightThemeStylesUrl: string = 'assets/themes/indigo-pink.css';
}