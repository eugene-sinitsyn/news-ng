import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ThemeService {
  public constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  private readonly stylesElementId: string = 'theme-styles';
  private readonly darkStylesUrl: string = 'assets/themes/pink-bluegrey.css';
  private readonly lightStylesUrl: string = 'assets/themes/indigo-pink.css';

  public switchTheme(dark: boolean): void {
    const stylesUrl = dark ? this.darkStylesUrl : this.lightStylesUrl;
    let stylesElement: HTMLLinkElement =
      this.document.getElementById(this.stylesElementId) as HTMLLinkElement;

    if (stylesElement) {
      stylesElement.href = stylesUrl;
    } else {
      stylesElement = this.document.createElement('link');
      stylesElement.id = this.stylesElementId;
      stylesElement.rel = 'stylesheet';
      stylesElement.href = stylesUrl;
      this.document.head.appendChild(stylesElement);
    }
  }
}