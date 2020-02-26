import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';

import { ArticleModel } from '../../models/article.model';
import { readLaterActions } from '../../state/actions/read-later.actions';
import { RootStateModel } from '../../state/models/root-state.model';

@Component({
  selector: 'news-read-later',
  templateUrl: './read-later.component.html'
})
export class ReadLaterComponent implements OnInit, OnDestroy {
  public constructor(private readonly store: Store<RootStateModel>) {}

  private readonly subscription: Subscription = new Subscription;

  public articles: ArticleModel[];
  public totalCount: number = 0;
  public visibleCount: number = 0;
  public infiniteScrollEnabled: boolean = true;

  public ngOnInit(): void {
    this.subscription.add(
      combineLatest(
        this.store.select(state => state.readLater.articles),
        this.store.select(state => state.readLater.page),
        this.store.select(state => state.preferences.pageSize)
      ).subscribe(([articles, page, pageSize]) => {
        this.articles = articles?.slice(0, page * pageSize);
        this.totalCount = articles?.length || 0;
        this.visibleCount = this.articles?.length || 0;
      })
    );
    this.subscription.add(
      this.store.select(state => state.preferences.infiniteScroll)
        .subscribe(infiniteScroll => this.infiniteScrollEnabled = infiniteScroll)
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public showMore(): void {
    this.store.dispatch(readLaterActions.showMoreArticles());
  }
}