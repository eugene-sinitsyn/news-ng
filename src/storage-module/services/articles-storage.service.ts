import { Injectable } from '@angular/core';
import { ArticleModel } from '@domain';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class ArticlesStorageService {
  public constructor(
    private readonly localStorageService: LocalStorageService
  ) {
    const articles = localStorageService.get(this.namespace);
    if (!articles || !Array.isArray(articles))
      localStorageService.store(this.namespace, []);
  }

  private readonly namespace: string = 'articles';

  public store(article: ArticleModel): void {
    if (!article) return;
    const articles = this.getAll();
    const index = articles.findIndex(a => a.url === article.url);
    if (index >= 0) articles[index] = article;
    else articles.push(article);
    this.localStorageService.store(this.namespace, articles);
  }

  public getAll(): ArticleModel[] {
    const articles = this.localStorageService.get(this.namespace);
    return !articles || !Array.isArray(articles) ? [] : articles;
  }

  public deleteAll(): void {
    this.localStorageService.store(this.namespace, []);
  }

  public delete(url: string): void {
    const articles = this.getAll().filter(article => article.url !== url);
    this.localStorageService.store(this.namespace, articles);
  }
}