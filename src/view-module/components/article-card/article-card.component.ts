import { Component, Input } from '@angular/core';
import { ArticleModel } from '@domain';
import { faExternalLinkAlt, faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'news-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() public article: ArticleModel;

  public readonly faExternalLinkAlt: IconDefinition = faExternalLinkAlt;
  public readonly faClock: IconDefinition = faClock;
}