import { Component } from '@angular/core';
import { IconDefinition, faBars } from '@fortawesome/free-solid-svg-icons';
import { ViewConfiguration } from '@view/config';

@Component({
  selector: 'news-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(public readonly viewConfig: ViewConfiguration) {}

  public readonly faBars: IconDefinition = faBars;
}