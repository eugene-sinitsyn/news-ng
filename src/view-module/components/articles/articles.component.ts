import { Component, Input } from '@angular/core';
import { ArticleModel } from '@domain';

@Component({
  selector: 'news-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent {
  @Input() articles: ArticleModel[];
}