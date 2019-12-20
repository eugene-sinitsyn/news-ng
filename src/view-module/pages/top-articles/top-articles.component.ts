import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel, TopArticlesRequestModel, LanguageEnum, CountryEnum } from '@domain';
import { RootStateModel, articlesActions } from '@state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news-top-articles',
  templateUrl: './top-articles.component.html'
})
export class TopArticlesComponent implements OnInit, OnDestroy {
  public constructor(private readonly store: Store<RootStateModel>) {}

  private subscription: Subscription;
  public articles: ArticleModel[];

  public ngOnInit(): void {
    this.subscription = this.store.select(state => state.articles)
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
    this.store.dispatch(articlesActions.searchTopArticles({ request }));
  }
}