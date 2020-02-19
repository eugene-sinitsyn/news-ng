import { Injectable } from '@angular/core';
import { ArticleModel } from '@domain';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class ReadLaterStorageService {
  public constructor(
    private readonly localStorageService: LocalStorageService
  ) {
    const articles = localStorageService.get(this.namespace);
    if (!articles || !Array.isArray(articles))
      localStorageService.store(this.namespace, []);
  }

  private readonly namespace: string = 'readLater';

  public store(articles: ArticleModel[]): void {
    this.localStorageService.store(this.namespace, articles);
  }

  public get(): ArticleModel[] {
    const articles = this.localStorageService.get(this.namespace)
    return Array.isArray(articles) ? articles : [];
  }
}