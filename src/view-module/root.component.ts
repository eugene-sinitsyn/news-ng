import { Component } from '@angular/core';
import { RootStateModel, articlesActions } from '@state';
import { Store } from '@ngrx/store';
import { LanguageEnum, ArticleModel } from '@domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'news-root',
  templateUrl: './root.component.html',
  styles: []
})
export class AppComponent {
  public constructor(private readonly store: Store<RootStateModel>) {
    this.articles$ = this.store.select(state => state.articles);
  }

  public readonly articles$: Observable<ArticleModel[]>;

  public fetchTop(): void {
    this.store.dispatch(articlesActions.loadTopArticles({
      request: { language: LanguageEnum.english }
    }));
  }

  public fetchEverything(): void {
    this.store.dispatch(articlesActions.searchArticles({
      request: {
        language: LanguageEnum.english,
        searchString: 'Microsoft'
      }
    }));
  }
}
