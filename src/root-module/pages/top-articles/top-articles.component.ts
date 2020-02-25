import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { ArticleModel } from '../../models/article.model';
import { topActions } from '../../state/actions/top.actions';
import { RootStateModel } from '../../state/models/root-state.model';

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
  public totalCount: number = 0;
  public visibleCount: number = 0;
  public infiniteScrollEnabled: boolean = true;

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.top.filter).subscribe(filter => {
        this.filterApplied = !!filter;
        this.toggleFilter(false);
      })
    );
    this.subscription.add(
      combineLatest(
        this.store.select(state => state.top.articles),
        this.store.select(state => state.top.page),
        this.store.select(state => state.preferences.pageSize),
      ).subscribe(([articles, page, pageSize]) => {
        this.articles = articles && articles.slice(0, page * pageSize);
        this.totalCount = (articles && articles.length) || 0;
        this.visibleCount = (this.articles && this.articles.length) || 0;
        
      })
    );
    this.subscription.add(
      this.store.select(state => state.preferences.language)
        .pipe(skip(1))
        .subscribe(() => this.store.dispatch(topActions.fetchArticles()))
    );
    this.subscription.add(
      this.store.select(state => state.preferences.infiniteScroll)
        .subscribe(infiniteScroll => this.infiniteScrollEnabled = infiniteScroll)
    );

    if (!this.articles) this.store.dispatch(topActions.fetchArticles());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleFilter(opened: boolean): void {
    this.filterOpened = opened;
  }

  public showMore(): void {
    this.store.dispatch(topActions.showMoreArticles());
  }
}