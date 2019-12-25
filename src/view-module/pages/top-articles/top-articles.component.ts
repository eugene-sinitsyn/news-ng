import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel, TopArticlesRequestModel, LanguageEnum, CountryEnum } from '@domain';
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
  public readonly filterOpened$: Observable<boolean>;
  public articles: ArticleModel[];

  public ngOnInit(): void {
    this.subscription = this.store.select(state => state.top.articles)
      .subscribe(articles => this.articles = articles);
    if (!this.articles) this.dispatchSearch();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public applyFilter(filterState: TopFilterStateModel = null): void {
    this.dispatchSearch(filterState && this.toRequestModel(filterState));
  }

  private dispatchSearch(request: TopArticlesRequestModel = null): void {
    if (!request) request = new TopArticlesRequestModel();
    request.language = LanguageEnum.english;
    this.store.dispatch(topArticlesActions.fetchArticles({ request }));
  }

  private toRequestModel(filterState: TopFilterStateModel): TopArticlesRequestModel {
    const request = new TopArticlesRequestModel();
    request.category = filterState.category;
    request.country = filterState.country;
    request.sources = filterState.sources;
    request.searchString = filterState.searchString;
    return request;
  }
}