import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

import { ArticleModel } from '../../../models/article.model';

@Component({
  selector: 'news-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  @Input() articles: ArticleModel[];
  @Input() public set withReadLaterAction(value: any) {
    this.isReadLaterActionVisible = coerceBooleanProperty(value);
  }
  @Input() public set withRemoveAction(value: any) {
    this.isRemoveActionVisible = coerceBooleanProperty(value);
  }

  public isReadLaterActionVisible: boolean = false;
  public isRemoveActionVisible: boolean = false;
}