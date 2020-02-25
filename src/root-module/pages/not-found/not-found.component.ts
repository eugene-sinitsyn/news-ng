import { Component } from '@angular/core';
import { faMapSigns, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'news-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  public readonly faMapSigns: IconDefinition = faMapSigns;
}