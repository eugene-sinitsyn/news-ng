import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  faExternalLinkAlt,
  faClock,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { ArticleModel } from '@domain';
import { RootStateModel, readLaterActions } from '@state';

@Component({
  selector: 'news-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  public constructor(private readonly store: Store<RootStateModel>) {}

  @Input() public article: ArticleModel;

  public readonly faExternalLinkAlt: IconDefinition = faExternalLinkAlt;
  public readonly faClock: IconDefinition = faClock;

  public addToReadLater(): void {
    this.store.dispatch(
      readLaterActions.addToReadlater({ article: this.article })
    );
  }
}