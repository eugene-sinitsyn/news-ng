import { Component, HostBinding } from '@angular/core';
import { IconDefinition, faCog } from '@fortawesome/free-solid-svg-icons';
import { ViewConfiguration } from '@view/config';

@Component({
  selector: 'news-preferences-link',
  templateUrl: './preferences-link.component.html',
  styleUrls: ['./preferences-link.component.scss']
})
export class PreferencesLinkComponent {
  public constructor(public readonly viewConfig: ViewConfiguration) {}

  public readonly faCog: IconDefinition = faCog;
  @HostBinding('class.menu-action-border') public readonly borderClass: boolean = true;
}