import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
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
        this.articles = articles && articles.slice(0, page * pageSize);
        this.totalCount = (articles && articles.length) || 0;
        this.visibleCount = (this.articles && this.articles.length) || 0;
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