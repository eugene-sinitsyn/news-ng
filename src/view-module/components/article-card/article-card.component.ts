import { Component, Input } from '@angular/core';
import { ArticleModel } from '@domain';
import { faExternalLinkAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'news-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() public article: ArticleModel;

  public readonly faExternalLinkAlt: IconDefinition = faExternalLinkAlt;
}