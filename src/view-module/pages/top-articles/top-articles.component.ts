import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ArticleModel } from '@domain';
import { RootStateModel, topArticlesActions } from '@state';

@Component({
  selector: 'news-top-articles',
  templateUrl: './top-articles.component.html',
  styleUrls: ['./top-articles.component.scss']
})
export class TopArticlesComponent implements OnInit, OnDestroy {
  public constructor(private readonly store: Store<RootStateModel>) {}

  private readonly subscription: Subscription = new Subscription();

  public filterOpened: boolean;
  public filterApplied: boolean;
  public articles: ArticleModel[];
  public loaded: number = 0;
  public total: number = 0;

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.top.filter)
        .subscribe(filter => this.filterApplied = !!filter)
    );
    this.subscription.add(
      this.store.select(state => state.top.articles)
        .subscribe(articles => {
          this.articles = articles;
          this.loaded = (articles && articles.length) || 0;
        })
    );
    this.subscription.add(
      this.store.select(state => state.top.total)
        .subscribe(total => this.total = total)
    );
    this.subscription.add(
      this.store.select(state => state.preferences.language)
        .pipe(skip(1))
        .subscribe(() => this.store.dispatch(topArticlesActions.fetchArticles()))
    );

    if (!this.articles) this.store.dispatch(topArticlesActions.fetchArticles());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleFilter(opened: boolean): void {
    this.filterOpened = opened;
  }

  public loadMore(): void {
    this.store.dispatch(topArticlesActions.fetchMoreArticles());
  }
}