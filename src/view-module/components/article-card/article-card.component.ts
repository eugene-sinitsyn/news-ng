import { Component, Input } from '@angular/core';
import { ArticleModel } from '@domain';

@Component({
  selector: 'news-article-card',
  templateUrl: './article-card.component.html'
})
export class ArticleCardComponent {
  @Input() public article: ArticleModel;
}