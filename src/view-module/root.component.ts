import { Component } from '@angular/core';
import { RootStateModel, articlesActions, sourcesActions } from '@state';
import { Store } from '@ngrx/store';
import { LanguageEnum, ArticleModel, SourceDetailsModel, CountryEnum } from '@domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'news-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppComponent {
  public constructor(private readonly store: Store<RootStateModel>) {
    this.articles$ = this.store.select(state => state.articles);
    this.sources$ = this.store.select(state => state.sources);
  }

  public readonly articles$: Observable<ArticleModel[]>;
  public readonly sources$: Observable<SourceDetailsModel[]>;

  public fetchTop(): void {
    this.clear();
    this.store.dispatch(articlesActions.searchTopArticles({
      request: { language: LanguageEnum.english }
    }));
  }

  public fetchEverything(): void {
    this.clear();
    this.store.dispatch(articlesActions.searchArticles({
      request: {
        language: LanguageEnum.english,
        searchString: 'Microsoft'
      }
    }));
  }

  public fetchSources(): void {
    this.clear();
    this.store.dispatch(sourcesActions.searchSources({
      request: {
        language: LanguageEnum.english,
        country: CountryEnum.unitesStatesOfAmerica
      }
    }));
  }

  private clear(): void {
    this.store.dispatch(articlesActions.storeArticles({ articles: [] }));
    this.store.dispatch(sourcesActions.storeSources({ sources: [] }));
  }
}