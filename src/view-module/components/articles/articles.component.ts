import { Component, Input } from '@angular/core';
import { ArticleModel } from '@domain';

@Component({
  selector: 'news-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  @Input() articles: ArticleModel[];
}