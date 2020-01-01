import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
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
  public constructor(private readonly store: Store<RootStateModel>) {
    this.filterOpened$ = store.select(state => state.ui.filterOpened);
  }

  private subscription: Subscription;

  public readonly filterOpened$: Observable<boolean>;
  public articles: ArticleModel[];

  public ngOnInit(): void {
    this.subscription = this.store.select(state => state.top.articles)
      .subscribe(articles => this.articles = articles);
    this.subscription.add(this.store.select(state => state.preferences.language)
      .pipe(skip(1))
      .subscribe(() => this.store.dispatch(topArticlesActions.fetchArticles())));

    if (!this.articles) this.store.dispatch(topArticlesActions.fetchArticles());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}