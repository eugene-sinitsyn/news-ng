import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ArticleModel } from '@domain';
import { RootStateModel, readLaterActions } from '@state';

@Component({
  selector: 'news-read-later',
  templateUrl: './read-later.component.html'
})
export class ReadLaterComponent implements OnInit, OnDestroy {
  public constructor(private readonly store: Store<RootStateModel>) {}

  private readonly subscription: Subscription = new Subscription;
  public articles: ArticleModel[];

  public ngOnInit(): void {
    if (!this.articles)
      this.store.dispatch(readLaterActions.loadReadLaterArticles());

    this.subscription.add(
      this.store.select(state => state.readLater)
        .subscribe(articles => this.articles = articles)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}