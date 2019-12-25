import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel, TopArticlesRequestModel, LanguageEnum, CountryEnum } from '@domain';
import { RootStateModel, topArticlesActions } from '@state';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'news-top-articles',
  templateUrl: './top-articles.component.html'
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

  private dispatchSearch(): void {
    const request: TopArticlesRequestModel = new TopArticlesRequestModel();
    request.language = LanguageEnum.english;
    request.country = CountryEnum.unitesStatesOfAmerica;
    this.store.dispatch(topArticlesActions.fetchArticles({ request }));
  }
}