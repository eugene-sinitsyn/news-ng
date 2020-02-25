import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import {
  faClock,
  faExternalLinkAlt,
  faTrash,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { ArticleModel } from '../../../models/article.model';
import { RootConfig } from '../../../root.config';
import { readLaterActions } from '../../../state/actions/read-later.actions';
import { RootStateModel } from '../../../state/models/root-state.model';

@Component({
  selector: 'news-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  public constructor(
    public readonly rootConfig: RootConfig,
    private readonly store: Store<RootStateModel>
  ) {}

  @Input() public article: ArticleModel;
  @Input() public set withReadLaterAction(value: any) {
    this.isReadLaterActionVisible = coerceBooleanProperty(value);
  }
  @Input() public set withRemoveAction(value: any) {
    this.isRemoveActionVisible = coerceBooleanProperty(value);
  }

  public readonly faExternalLinkAlt: IconDefinition = faExternalLinkAlt;
  public readonly faClock: IconDefinition = faClock;
  public readonly faTrash: IconDefinition = faTrash;
  public isReadLaterActionVisible: boolean = false;
  public isRemoveActionVisible: boolean = false;

  public saveToReadLater(): void {
    this.store.dispatch(
      readLaterActions.saveToReadlater({ article: this.article })
    );
  }

  public removeFromReadLater(): void {
    const url = this.article && this.article.url;
    this.store.dispatch(readLaterActions.deleteFromReadLater({ url }));
  }
}