import { Component, OnInit } from '@angular/core';
import { RootStateModel, articlesActions } from '@state';
import { Store } from '@ngrx/store';
import { LanguageEnum, ArticleModel } from '@domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'news-root',
  templateUrl: './root.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public constructor(
    private readonly store: Store<RootStateModel>
  ) {}

  public articles$: Observable<ArticleModel[]>;

  public ngOnInit(): void {
    this.articles$ = this.store.select(state => state.articles);
    this.store.dispatch(articlesActions.loadTopArticles({
      request: { language: LanguageEnum.english }
    }));
  }
}
