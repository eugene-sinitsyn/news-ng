import { Component } from '@angular/core';
import { IconDefinition, faBars } from '@fortawesome/free-solid-svg-icons';
import { RootConfig } from '../../root.config';

@Component({
  selector: 'news-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(public readonly rootConfig: RootConfig) {}

  public readonly faBars: IconDefinition = faBars;
}