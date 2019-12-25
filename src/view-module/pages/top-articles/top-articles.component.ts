import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel, TopArticlesRequestModel, LanguageEnum } from '@domain';
import { RootStateModel, topArticlesActions, TopFilterStateModel } from '@state';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

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
  private language: LanguageEnum;
  private filterState: TopFilterStateModel;

  public readonly filterOpened$: Observable<boolean>;
  public articles: ArticleModel[];

  public ngOnInit(): void {
    this.subscription = this.store.select(state => state.top.articles)
      .subscribe(articles => this.articles = articles);
    this.subscription.add(this.store
      .select(state => state.preferences.language)
      .subscribe(language => {
        this.language = language;
        this.dispatchSearch();
      }));
    this.subscription.add(this.store
      .select(state => state.top.filter)
      .subscribe(filterState => {
        this.filterState = filterState;
        this.dispatchSearch();
      }));

    if (!this.articles) this.dispatchSearch();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  private dispatchSearch(): void {
    const request = new TopArticlesRequestModel();
    request.language = this.language;
    if (this.filterState) {
      request.category = this.filterState.category;
      request.country = this.filterState.country;
      request.sources = this.filterState.sources;
      request.searchString = this.filterState.searchString;
    }

    this.store.dispatch(topArticlesActions.fetchArticles({ request }));
  }
}